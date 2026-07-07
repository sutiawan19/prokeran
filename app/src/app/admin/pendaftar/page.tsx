"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Check, X, ArrowUpDown, FileText, CheckCircle, XCircle, Clock, Users, MessageSquare } from 'lucide-react';
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
  DialogDescription,
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
import { mockRegistrationResults, mockProkers } from '@/lib/mock-data';
import { RegistrationStatus } from '@/types';

export default function ReviewPendaftarPage() {
  const [applicants, setApplicants] = useState<any[]>([]);
  const [prokers, setProkers] = useState<any[]>([]);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prokersRes, regRes] = await Promise.all([
        fetch('/api/prokers'),
        fetch('/api/registrations')
      ]);
      if (prokersRes.ok) setProkers(await prokersRes.json());
      if (regRes.ok) setApplicants(await regRes.json());
    } catch (e) {
      console.error(e);
    }
  };
  
  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProker, setFilterProker] = useState('all');
  const [filterDivisi, setFilterDivisi] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Dialogs
  const [selectedApplicant, setSelectedApplicant] = useState<typeof mockRegistrationResults[0] | null>(null);
  
  // Get unique divisions for the selected proker
  const selectedProkerObj = prokers.find(p => p.title === filterProker);
  const divisionsOptions = selectedProkerObj?.divisions || [];

  // Summary Stats
  const totalPendaftar = applicants.length;
  const pendingReview = applicants.filter(a => a.status === 'pending').length;
  const totalDiterima = applicants.filter(a => a.status === 'accepted').length;
  const totalDitolak = applicants.filter(a => a.status === 'rejected').length;

  // Filter & Sort Logic
  let filtered = applicants.filter(app => {
    const matchSearch = app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (app.nim || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchProker = filterProker === 'all' || app.proker_title === filterProker;
    const matchDivisi = filterDivisi === 'all' || app.division_name === filterDivisi;
    const matchStatus = filterStatus === 'all' || app.status === filterStatus;
    
    return matchSearch && matchProker && matchDivisi && matchStatus;
  });

  filtered.sort((a, b) => {
    switch(sortBy) {
      case 'name-asc': return a.full_name.localeCompare(b.full_name);
      case 'name-desc': return b.full_name.localeCompare(a.full_name);
      case 'date-desc': return new Date(b.registered_at).getTime() - new Date(a.registered_at).getTime();
      case 'date-asc': return new Date(a.registered_at).getTime() - new Date(b.registered_at).getTime();
      default: return 0;
    }
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleUpdateStatus = async (id: string, newStatus: RegistrationStatus) => {
    try {
      const res = await fetch('/api/registrations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      
      if (!res.ok) throw new Error('Failed to update status');
      
      setApplicants(applicants.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      
      if (selectedApplicant?.id === id) {
        setSelectedApplicant({ ...selectedApplicant, status: newStatus });
      }
    } catch (error) {
      console.error(error);
      alert('Gagal mengupdate status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'accepted': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Diterima</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Ditolak</Badge>;
      default: return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Menunggu</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Review Pendaftar</h1>
          <p className="text-gray-500 font-medium mt-1">Lakukan seleksi calon panitia program kerja.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Total Pendaftar</p>
            <h3 className="text-3xl font-semibold text-gray-900 mt-1">{totalPendaftar}</h3>
          </div>
          <Users className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Pending Review</p>
            <h3 className="text-3xl font-semibold text-gray-900 mt-1">{pendingReview}</h3>
          </div>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Diterima</p>
            <h3 className="text-3xl font-semibold text-gray-900 mt-1">{totalDiterima}</h3>
          </div>
          <CheckCircle className="w-5 h-5 text-gray-400" />
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Ditolak</p>
            <h3 className="text-3xl font-semibold text-gray-900 mt-1">{totalDitolak}</h3>
          </div>
          <XCircle className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Cari nama atau NIM..." 
            className="pl-9 h-10 rounded-lg bg-gray-50/50 border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500 transition-all text-sm text-gray-900"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className="flex flex-1 w-full flex-wrap gap-2 justify-end">
          <Select value={filterProker} onValueChange={(val) => { if (val !== null) { setFilterProker(val); setFilterDivisi('all'); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[180px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
              <SelectValue placeholder="Semua Proker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Proker</SelectItem>
              {prokers.map(p => (
                <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filterProker !== 'all' && (
            <Select value={filterDivisi} onValueChange={(val) => { if (val !== null) { setFilterDivisi(val); setCurrentPage(1); } }}>
              <SelectTrigger className="w-[160px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                {divisionsOptions.map((div: any) => (
                  <SelectItem key={div.id} value={div.name}>{div.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={filterStatus} onValueChange={(val) => { if (val !== null) { setFilterStatus(val); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[150px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="pending">Menunggu</SelectItem>
              <SelectItem value="accepted">Diterima</SelectItem>
              <SelectItem value="rejected">Ditolak</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(val) => { if (val !== null) setSortBy(val); }}>
            <SelectTrigger className="w-[180px] h-10 bg-gray-50/50 border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 font-medium text-sm text-gray-700">
              <ArrowUpDown className="w-4 h-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Pendaftaran Baru</SelectItem>
              <SelectItem value="date-asc">Pendaftaran Lama</SelectItem>
              <SelectItem value="name-asc">Nama (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nama (Z-A)</SelectItem>
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
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10 pl-6">Nama Lengkap & NIM</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Proker & Divisi</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Tanggal Daftar</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Status</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {paginatedData.map((app) => (
                  <TableRow key={app.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="pl-6 py-3">
                      <div className="font-medium text-gray-900 text-sm">{app.full_name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{app.nim || '-'} • {app.program_studi || '-'}</div>
                    </TableCell>
                    <TableCell className="py-3">
                      <div className="font-medium text-gray-900 text-sm">{app.proker_title}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{app.division_name}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-gray-500 py-3">
                      {new Date(app.registered_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="py-3">{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right pr-6 py-3">
                      <Tooltip>
                        <TooltipTrigger render={<span className="inline-flex" />}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:text-gray-900"
                            onClick={() => setSelectedApplicant(app)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Detail
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Lihat Berkas & Lakukan Seleksi</p></TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TooltipProvider>
              {paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-gray-500 font-medium">
                    Tidak ada pendaftar yang cocok dengan filter.
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

      {/* Detail Dialog Modal */}
      <Dialog open={!!selectedApplicant} onOpenChange={(open) => !open && setSelectedApplicant(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-white border-gray-200 p-0 rounded-xl">
          {selectedApplicant && (
            <>
              <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div>
                  <DialogTitle className="text-xl font-bold text-gray-900 tracking-tight">Detail Pendaftar</DialogTitle>
                  <DialogDescription className="text-sm text-gray-500 mt-1">
                    Tinjau informasi pendaftar untuk proker {selectedApplicant.proker_title}
                  </DialogDescription>
                </div>
                {getStatusBadge(selectedApplicant.status)}
              </div>
              
              <div className="p-6 space-y-8">
                {/* 1. Data Diri & Kontak */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Data Diri & Kontak</h4>
                  <div className="grid md:grid-cols-2 gap-6 bg-gray-50/50 p-5 rounded-xl border border-gray-100">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nama Lengkap</p>
                      <p className="font-semibold text-gray-900">{selectedApplicant.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">NIM / Prodi</p>
                      <p className="font-semibold text-gray-900">{selectedApplicant.nim || '-'} • {selectedApplicant.program_studi || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Nomor WhatsApp</p>
                      <p className="font-semibold text-gray-900">{selectedApplicant.phone || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pilihan Divisi</p>
                      <p className="font-semibold text-gray-900">{selectedApplicant.division_name}</p>
                    </div>
                  </div>
                </div>

                {/* 2. Motivasi & Pengalaman */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Motivasi & Pengalaman</h4>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <h5 className="font-medium text-sm text-gray-700">Alasan Bergabung Kepanitiaan</h5>
                      </div>
                      <div className="p-4 text-sm text-gray-600 leading-relaxed bg-white">
                        {/* Using motivation as general motivation if general_motivation isn't present in mock */}
                        {selectedApplicant.motivation || 'Tidak ada alasan yang dituliskan.'}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <h5 className="font-medium text-sm text-gray-700">Pengalaman Organisasi</h5>
                      </div>
                      <div className="p-4 text-sm text-gray-600 leading-relaxed bg-white whitespace-pre-wrap">
                        {selectedApplicant.experience || 'Tidak ada pengalaman yang dicantumkan.'}
                      </div>
                    </div>

                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <div className="bg-gray-50/50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                        <h5 className="font-medium text-sm text-gray-700">Motivasi Memilih Divisi {selectedApplicant.division_name}</h5>
                      </div>
                      <div className="p-4 text-sm text-gray-600 leading-relaxed bg-white">
                        {/* Because mock data only has one motivation field, we re-use or mock it. Ideally this maps to formData.motivation */}
                        {selectedApplicant.motivation || 'Tidak ada motivasi divisi yang dicantumkan.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons for Selection */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center gap-3 rounded-b-xl sticky bottom-0">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedApplicant(null)}
                  className="mr-auto border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  Tutup
                </Button>
                
                {selectedApplicant.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'rejected')}
                      className="bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 shadow-sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Tolak
                    </Button>
                    <Button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'accepted')}
                      className="bg-gray-900 text-white hover:bg-gray-800 shadow-sm"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Terima Pendaftar
                    </Button>
                  </>
                )}
                
                {selectedApplicant.status !== 'pending' && (
                  <Button 
                    onClick={() => handleUpdateStatus(selectedApplicant.id, 'pending')}
                    variant="outline"
                  >
                    Batal (Kembalikan ke Pending)
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
