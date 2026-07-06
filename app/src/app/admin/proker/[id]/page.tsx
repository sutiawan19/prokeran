"use client";

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockProkers, mockRegistrationResults } from '@/lib/mock-data';
import { ArrowLeft, MapPin, Calendar, Users, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function AdminProkerDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  
  // Find proker by slug
  const proker = mockProkers.find(p => p.slug === unwrappedParams.id);
  
  if (!proker) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h2 className="text-2xl font-bold mb-4">Program Kerja tidak ditemukan</h2>
        <Button onClick={() => router.push('/admin/proker')}>Kembali</Button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming': return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none">Akan Datang</Badge>;
      case 'ongoing': return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-none">Sedang Berjalan</Badge>;
      case 'completed': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">Selesai</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none">Unknown</Badge>;
    }
  };

  const totalQuota = proker.divisions?.reduce((acc, div) => acc + div.quota, 0) || 0;
  const totalApplicants = proker.divisions?.reduce((acc, div) => acc + (div.filled_quota || 0), 0) || 0;

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center gap-4 mb-2">
        <Button variant="outline" size="icon" onClick={() => router.push('/admin/proker')} className="h-10 w-10 rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-black uppercase tracking-tight">Detail Program Kerja</h1>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#0038FF]/20 to-purple-500/20 relative">
          <div className="absolute -bottom-10 left-8">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md border">
              <Briefcase className="w-10 h-10 text-[#0038FF]" />
            </div>
          </div>
        </div>

        {/* Content Info */}
        <div className="pt-14 px-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-black">{proker.title}</h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-black/60 font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {proker.location || 'Lokasi belum ditentukan'}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> 
                  {proker.start_date ? new Date(proker.start_date).toLocaleDateString('id-ID') : '-'}
                </span>
              </div>
            </div>
            {getStatusBadge(proker.status)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-[#0038FF]" />
                  Deskripsi Kegiatan
                </h3>
                <p className="text-black/70 leading-relaxed">
                  {proker.description || 'Belum ada deskripsi yang ditambahkan untuk program kerja ini.'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-[#0038FF]" />
                  Daftar Divisi & Kuota
                </h3>
                <div className="border rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-50/50">
                      <TableRow>
                        <TableHead className="font-bold text-black py-3">Nama Divisi</TableHead>
                        <TableHead className="font-bold text-black py-3 text-center">Kuota</TableHead>
                        <TableHead className="font-bold text-black py-3 text-center">Pendaftar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {proker.divisions && proker.divisions.length > 0 ? (
                        proker.divisions.map(div => (
                          <TableRow key={div.id}>
                            <TableCell className="font-medium py-3">{div.name}</TableCell>
                            <TableCell className="text-center py-3">{div.quota}</TableCell>
                            <TableCell className="text-center py-3 font-bold text-[#0038FF]">{div.filled_quota}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-6 text-black/50">Tidak ada divisi.</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-5 rounded-2xl border border-black/5">
                <h4 className="font-bold mb-4 uppercase tracking-wider text-sm text-black/50">Ringkasan Pendaftaran</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-black/60 mb-1">Total Kuota Tersedia</p>
                    <p className="text-2xl font-black">{totalQuota} <span className="text-base font-medium text-black/40">orang</span></p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60 mb-1">Total Pendaftar</p>
                    <p className="text-2xl font-black text-[#0038FF]">{totalApplicants} <span className="text-base font-medium text-black/40">orang</span></p>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                    <div 
                      className="h-full bg-[#0038FF]" 
                      style={{ width: `${Math.min((totalApplicants / (totalQuota || 1)) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full h-12 bg-white text-[#0038FF] border border-[#0038FF] hover:bg-[#0038FF]/5 font-bold rounded-xl"
                onClick={() => router.push('/admin/pendaftar')}
              >
                Lihat Pendaftar Proker Ini
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
