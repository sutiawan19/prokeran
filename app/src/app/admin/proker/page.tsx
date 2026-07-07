"use client";

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Eye, Search, Filter, ArrowUpDown, Loader2 } from 'lucide-react';
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
import { ProkerStatus } from '@/types';
import { useRouter } from 'next/navigation';

export interface ProkerData {
  id: string;
  title: string;
  slug: string;
  status: ProkerStatus;
  description: string;
  banner_url: string;
  startDate: string;
  endDate: string;
  registration_close: string;
  benefits: string;
  documentation: string;
  divisions: number;
  applicants: number;
}

export default function KelolaProkerPage() {
  const router = useRouter();
  const [prokers, setProkers] = useState<ProkerData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProkers();
  }, []);

  const fetchProkers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/prokers');
      if (!res.ok) throw new Error('Failed to fetch prokers');
      const data = await res.json();
      
      const mappedData = data.map((p: any, index: number) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        status: p.status,
        description: p.description || '',
        banner_url: p.banner_url || '',
        startDate: p.start_date || '',
        endDate: p.end_date || '',
        registration_close: p.registration_close || '',
        benefits: p.benefits || '',
        documentation: typeof p.documentation === 'string' ? p.documentation : JSON.stringify(p.documentation || []),
        divisions: p.divisions?.length || 0,
        applicants: 0,
      }));
      setProkers(mappedData);
    } catch (error) {
      console.error('Failed to load prokers:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
      // Removed applicants sorting since the field is gone in MVP, or keep fallback
      case 'period-desc': return new Date(b.startDate || 0).getTime() - new Date(a.startDate || 0).getTime();
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Dialogs
  const handleOpenAddDialog = () => {
    router.push('/admin/proker/create');
  };

  const handleOpenEditDialog = (proker: ProkerData) => {
    router.push(`/admin/proker/create?id=${proker.id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin menghapus proker ini? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        const res = await fetch(`/api/prokers?id=${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setProkers(prokers.filter(p => p.id !== id));
          if (paginatedData.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        } else {
          alert('Gagal menghapus data.');
        }
      } catch (error) {
        console.error('Failed to delete proker:', error);
        alert('Terjadi kesalahan saat menghapus data.');
      }
    }
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Proker</h1>
          <p className="text-gray-500 font-medium mt-1">Atur dan pantau semua program kerja organisasi.</p>
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
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Semua Proker</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">{prokers.length}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Sedang Berjalan</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">{totalOngoing}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Akan Datang</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">{totalUpcoming}</h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">Selesai</p>
            <h3 className="text-2xl font-semibold text-gray-900 mt-1">{totalCompleted}</h3>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Cari nama proker..." 
            className="pl-9 h-10 rounded-lg bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500 transition-all text-sm text-gray-900"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <Select value={statusFilter} onValueChange={(val) => { if (val !== null) { setStatusFilter(val); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[160px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
              <Filter className="w-4 h-4 mr-2 text-gray-400" />
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
            <SelectTrigger className="w-[180px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
              <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
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
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10 pl-4">Nama Proker</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Status</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Periode</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Divisi</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Pendaftar</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10 text-right pr-4">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-500" />
                    <p className="mt-2 text-gray-500 font-medium">Memuat data dari sistem...</p>
                  </TableCell>
                </TableRow>
              ) : (
              <TooltipProvider>
                {paginatedData.map((proker) => (
                  <TableRow key={proker.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900 pl-4 py-3 text-sm">{proker.title}</TableCell>
                    <TableCell className="py-3">{getStatusBadge(proker.status)}</TableCell>
                    <TableCell className="text-sm font-medium text-gray-500 py-3">
                      {proker.startDate ? new Date(proker.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '-'} 
                      {' - '} 
                      {proker.endDate ? new Date(proker.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'short'}) : '-'}
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-600 font-medium">
                      {proker.divisions} Divisi
                    </TableCell>
                    <TableCell className="py-3 text-sm text-gray-600 font-medium">
                      {proker.applicants} Orang
                    </TableCell>
                    <TableCell className="text-right pr-4 py-3">
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
              )}
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

    </div>
  );
}
