"use client";

import { useState } from 'react';
import { Search, Filter, Eye, Check, X, ArrowUpDown, FileText, CheckCircle, XCircle, Clock, Users } from 'lucide-react';
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
import { mockRegistrationResults, mockProkers } from '@/lib/mock-data';
import { RegistrationStatus } from '@/types';

export default function ReviewPendaftarPage() {
  const [applicants, setApplicants] = useState(mockRegistrationResults);
  
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
  const selectedProkerObj = mockProkers.find(p => p.title === filterProker);
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

  const handleUpdateStatus = (id: string, newStatus: RegistrationStatus) => {
    setApplicants(applicants.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    setSelectedApplicant(null); // Close dialog
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
          <h1 className="text-3xl font-black uppercase tracking-tight">Review Pendaftar</h1>
          <p className="text-black/60 font-medium mt-1">Lakukan seleksi calon panitia program kerja.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-black/50 uppercase">Total Pendaftar</p>
            <h3 className="text-xl font-black mt-1">{totalPendaftar}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center"><Users className="w-5 h-5"/></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-orange-600 uppercase">Pending Review</p>
            <h3 className="text-xl font-black mt-1">{pendingReview}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center"><Clock className="w-5 h-5"/></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase">Diterima</p>
            <h3 className="text-xl font-black mt-1">{totalDiterima}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center"><CheckCircle className="w-5 h-5"/></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-red-600 uppercase">Ditolak</p>
            <h3 className="text-xl font-black mt-1">{totalDitolak}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><XCircle className="w-5 h-5"/></div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between flex-wrap">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
          <Input 
            placeholder="Cari nama atau NIM..." 
            className="pl-10 h-10 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#0038FF]/50 transition-all"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          />
        </div>
        
        <div className="flex flex-1 w-full flex-wrap gap-2 justify-end">
          <Select value={filterProker} onValueChange={(val) => { if (val !== null) { setFilterProker(val); setFilterDivisi('all'); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[180px] h-10 bg-gray-50 border-transparent rounded-xl">
              <SelectValue placeholder="Semua Proker" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Proker</SelectItem>
              {mockProkers.map(p => (
                <SelectItem key={p.id} value={p.title}>{p.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filterProker !== 'all' && (
            <Select value={filterDivisi} onValueChange={(val) => { if (val !== null) { setFilterDivisi(val); setCurrentPage(1); } }}>
              <SelectTrigger className="w-[160px] h-10 bg-gray-50 border-transparent rounded-xl">
                <SelectValue placeholder="Semua Divisi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Divisi</SelectItem>
                {divisionsOptions.map(div => (
                  <SelectItem key={div.id} value={div.name}>{div.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select value={filterStatus} onValueChange={(val) => { if (val !== null) { setFilterStatus(val); setCurrentPage(1); } }}>
            <SelectTrigger className="w-[150px] h-10 bg-gray-50 border-transparent rounded-xl">
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
            <SelectTrigger className="w-[180px] h-10 bg-gray-50 border-transparent rounded-xl">
              <ArrowUpDown className="w-4 h-4 mr-2 text-black/50" />
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
      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="font-bold text-black py-4 pl-6">Nama Lengkap & NIM</TableHead>
                <TableHead className="font-bold text-black py-4">Proker & Divisi</TableHead>
                <TableHead className="font-bold text-black py-4">Tanggal Daftar</TableHead>
                <TableHead className="font-bold text-black py-4">Status</TableHead>
                <TableHead className="font-bold text-black py-4 text-right pr-6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TooltipProvider>
                {paginatedData.map((app) => (
                  <TableRow key={app.id} className="hover:bg-gray-50">
                    <TableCell className="pl-6 py-4">
                      <div className="font-bold">{app.full_name}</div>
                      <div className="text-xs text-black/50">{app.nim || '-'} • {app.program_studi || '-'}</div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="font-medium text-[#0038FF]">{app.proker_title}</div>
                      <div className="text-sm text-black/60">{app.division_name}</div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-black/70 py-4">
                      {new Date(app.registered_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="py-4">{getStatusBadge(app.status)}</TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <Tooltip>
                        <TooltipTrigger render={<span className="inline-flex" />}>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-white hover:bg-gray-50 text-[#0038FF] border-[#0038FF]/20"
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
                  <TableCell colSpan={5} className="h-32 text-center text-black/50 font-medium">
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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          {selectedApplicant && (
            <>
              <DialogHeader className="mb-4">
                <div className="flex items-center justify-between pr-8">
                  <DialogTitle className="text-2xl font-black">Detail Pendaftar</DialogTitle>
                  {getStatusBadge(selectedApplicant.status)}
                </div>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-black/40 uppercase mb-1">Informasi Mahasiswa</h4>
                    <p className="font-bold text-lg">{selectedApplicant.full_name}</p>
                    <p className="text-black/70">{selectedApplicant.nim} • Angkatan {selectedApplicant.angkatan}</p>
                    <p className="text-black/70">{selectedApplicant.program_studi}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-black/40 uppercase mb-1">Kontak</h4>
                    <p className="font-medium text-black/80">{selectedApplicant.email}</p>
                    <p className="font-medium text-black/80">{selectedApplicant.phone}</p>
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <h4 className="text-xs font-bold text-blue-500 uppercase mb-2">Pilihan Proker & Divisi</h4>
                  <p className="font-black text-blue-900 mb-1">{selectedApplicant.proker_title}</p>
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold">
                    {selectedApplicant.division_name}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-black flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#0038FF]" />
                    Motivasi Mengikuti Kepanitiaan
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl border border-black/5 text-sm leading-relaxed text-black/80">
                    {selectedApplicant.motivation || 'Tidak ada motivasi yang dituliskan.'}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-black flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-[#0038FF]" />
                    Pengalaman Organisasi / Kepanitiaan Sebelumnya
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl border border-black/5 text-sm leading-relaxed text-black/80 whitespace-pre-wrap">
                    {selectedApplicant.experience || 'Tidak ada pengalaman yang dicantumkan.'}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Selection */}
              <div className="mt-8 pt-6 border-t flex items-center gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setSelectedApplicant(null)}
                  className="mr-auto"
                >
                  Tutup
                </Button>
                
                {selectedApplicant.status === 'pending' && (
                  <>
                    <Button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'rejected')}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Tolak
                    </Button>
                    <Button 
                      onClick={() => handleUpdateStatus(selectedApplicant.id, 'accepted')}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold"
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
