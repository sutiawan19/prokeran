"use client";

import { useState } from 'react';
import { Plus, Edit, Trash, Eye, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockProkers as globalMockProkers } from '@/lib/mock-data';
import { ProkerStatus } from '@/types';
import { useRouter } from 'next/navigation';

// Map global mock data
const initialProkers = globalMockProkers.map((p, index) => ({
  id: index + 1,
  title: p.title,
  slug: p.slug,
  status: p.status,
  startDate: p.start_date,
  endDate: p.end_date,
  divisions: p.divisions?.length || 0,
  applicants: p.divisions?.reduce((acc, div) => acc + (div.filled_quota || 0), 0) || 0,
}));

export default function KelolaProkerPage() {
  const router = useRouter();
  const [prokers, setProkers] = useState(initialProkers);
  
  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<{
    title: string;
    status: ProkerStatus;
    startDate: string;
    endDate: string;
    divisions: number;
    applicants: number;
  }>({
    title: '',
    status: 'upcoming',
    startDate: '',
    endDate: '',
    divisions: 0,
    applicants: 0,
  });

  // Summaries
  const totalUpcoming = prokers.filter(p => p.status === 'upcoming').length;
  const totalOngoing = prokers.filter(p => p.status === 'ongoing').length;
  const totalCompleted = prokers.filter(p => p.status === 'completed').length;

  // Process Data
  let filtered = prokers.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  filtered.sort((a, b) => {
    switch(sortBy) {
      case 'name-asc': return a.title.localeCompare(b.title);
      case 'name-desc': return b.title.localeCompare(a.title);
      case 'applicants-desc': return b.applicants - a.applicants;
      case 'applicants-asc': return a.applicants - b.applicants;
      case 'period-desc': return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime();
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenAddDialog = () => {
    setEditingId(null);
    setFormData({ title: '', status: 'upcoming', startDate: '', endDate: '', divisions: 0, applicants: 0 });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (proker: typeof initialProkers[0]) => {
    setEditingId(proker.id);
    setFormData({
      title: proker.title,
      status: proker.status,
      startDate: proker.startDate || '',
      endDate: proker.endDate || '',
      divisions: proker.divisions,
      applicants: proker.applicants,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin menghapus proker ini? Tindakan ini tidak dapat dibatalkan.')) {
      setProkers(prokers.filter(p => p.id !== id));
      if (paginatedData.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleSave = () => {
    if (editingId) {
      setProkers(prokers.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      const newId = prokers.length > 0 ? Math.max(...prokers.map(p => p.id)) + 1 : 1;
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setProkers([{ ...formData, id: newId, slug }, ...prokers]);
    }
    setIsDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">Akan Datang</Badge>;
      case 'ongoing': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">Sedang Berjalan</Badge>;
      case 'completed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Selesai</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Kelola Proker</h1>
          <p className="text-black/60 font-medium mt-1">Atur dan pantau semua program kerja organisasi.</p>
        </div>
        <Button 
          className="bg-[#0038FF] hover:bg-[#0038FF]/90 text-white font-bold h-12 px-6 rounded-xl shadow-sm"
          onClick={handleOpenAddDialog}
        >
          <Plus className="w-5 h-5 mr-2" />
          Tambah Proker
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-black/50 uppercase">Semua Proker</p>
            <h3 className="text-xl font-black mt-1">{prokers.length}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-blue-500 uppercase">Sedang Berjalan</p>
            <h3 className="text-xl font-black mt-1">{totalOngoing}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-yellow-600 uppercase">Akan Datang</p>
            <h3 className="text-xl font-black mt-1">{totalUpcoming}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase">Selesai</p>
            <h3 className="text-xl font-black mt-1">{totalCompleted}</h3>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <Input 
            placeholder="Cari nama proker..." 
            className="pl-10 h-10 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#0038FF]/50 transition-all"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-2">
          <Select value={statusFilter} onValueChange={(val) => { if (val !== null) { setStatusFilter(val); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[160px] h-10 bg-gray-50 border-transparent rounded-xl">
              <Filter className="w-4 h-4 mr-2 text-black/50" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="upcoming">Akan Datang</SelectItem>
              <SelectItem value="ongoing">Sedang Berjalan</SelectItem>
              <SelectItem value="completed">Selesai</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val) => { if (val !== null) setSortBy(val); }}>
            <SelectTrigger className="w-[180px] h-10 bg-gray-50 border-transparent rounded-xl">
              <ArrowUpDown className="w-4 h-4 mr-2 text-black/50" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
              <SelectItem value="applicants-desc">Pendaftar Terbanyak</SelectItem>
              <SelectItem value="period-desc">Periode Terbaru</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-bold text-black py-4 pl-6">Nama Proker</TableHead>
                <TableHead className="font-bold text-black py-4">Status</TableHead>
                <TableHead className="font-bold text-black py-4">Periode</TableHead>
                <TableHead className="font-bold text-black py-4">Divisi</TableHead>
                <TableHead className="font-bold text-black py-4">Pendaftar</TableHead>
                <TableHead className="font-bold text-black py-4 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {paginatedData.map((proker) => (
                  <TableRow key={proker.id} className="hover:bg-gray-50">
                    <TableCell className="font-bold pl-6 py-4">{proker.title}</TableCell>
                    <TableCell className="py-4">{getStatusBadge(proker.status)}</TableCell>
                    <TableCell className="text-sm font-medium text-black/70 py-4">
                      {proker.startDate ? new Date(proker.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '-'} 
                      {' - '} 
                      {proker.endDate ? new Date(proker.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '-'}
                    </TableCell>
                    <TableCell className="py-4 font-bold">{proker.divisions}</TableCell>
                    <TableCell className="py-4 font-bold">{proker.applicants}</TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Tooltip>
                          <TooltipTrigger render={<span className="inline-flex" />}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                              onClick={() => window.open(`/proker/${proker.slug}`, '_blank')}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Lihat Detail</p></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger render={<span className="inline-flex" />}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50" 
                              onClick={() => handleOpenEditDialog(proker)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Edit Data</p></TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger render={<span className="inline-flex" />}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" 
                              onClick={() => handleDelete(proker.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent><p>Hapus</p></TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-black/50 font-medium">
                    Tidak ada Program Kerja yang cocok dengan filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between bg-gray-50/50">
            <span className="text-sm font-medium text-black/50">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filtered.length)} dari {filtered.length}
            </span>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Prev
              </Button>
              {Array.from({length: totalPages}).map((_, i) => (
                <Button 
                  key={i} 
                  variant={currentPage === i + 1 ? "default" : "outline"} 
                  size="sm"
                  className={currentPage === i + 1 ? "bg-[#0038FF] text-white" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Proker' : 'Tambah Proker'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Nama Proker</Label>
              <Input 
                id="title" 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(val) => { if (val !== null) setFormData({...formData, status: val as ProkerStatus}); }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Akan Datang</SelectItem>
                  <SelectItem value="ongoing">Sedang Berjalan</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input 
                  id="startDate" 
                  type="date"
                  value={formData.startDate} 
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input 
                  id="endDate" 
                  type="date"
                  value={formData.endDate} 
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})} 
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button className="bg-[#0038FF] hover:bg-[#0038FF]/90 text-white font-bold" onClick={handleSave}>Simpan</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
