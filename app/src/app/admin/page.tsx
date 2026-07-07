"use client";

import { useState, useEffect } from 'react';
import { 
  Users, FolderKanban, CheckCircle, Clock, 
  XCircle, Bell, User, Activity, FileText 
} from 'lucide-react';
import { mockProkers, mockRegistrationResults } from '@/lib/mock-data';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
  }, []);

  // --- Statistics Data ---
  const totalProker = mockProkers.length;
  const totalPendaftar = mockRegistrationResults.length;
  const waitingReview = mockRegistrationResults.filter(r => r.status === 'pending').length;
  const accepted = mockRegistrationResults.filter(r => r.status === 'accepted').length;
  const rejected = mockRegistrationResults.filter(r => r.status === 'rejected').length;

  // --- Chart Data (Registrants per Proker) ---
  const chartData = mockProkers.map(proker => {
    const count = mockRegistrationResults.filter(r => r.proker_title === proker.title).length;
    return { name: proker.title.substring(0, 15) + (proker.title.length > 15 ? '...' : ''), Pendaftar: count };
  });

  // --- Recent Applicants (Last 5) ---
  const recentApplicants = [...mockRegistrationResults]
    .sort((a, b) => new Date(b.registered_at).getTime() - new Date(a.registered_at).getTime())
    .slice(0, 5);

  // --- Mock Activities ---
  const activities = [
    { id: 1, text: 'M. Sutiawan mendaftar ke proker Inovasi Digital.', time: '10 menit yang lalu', icon: User, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 2, text: 'Status pendaftaran Budi diubah menjadi Diterima.', time: '1 jam yang lalu', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    { id: 3, text: 'Proker "Bakti Sosial" ditambahkan.', time: '3 jam yang lalu', icon: FolderKanban, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'accepted': 
      case 'completed': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Diterima</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Ditolak</Badge>;
      default: return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Menunggu</Badge>;
    }
  };

  if (!isClient) return null; // Hydration fix for recharts

  return (
    <div className="space-y-8 pb-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 font-medium mt-1">Ringkasan aktivitas dan statistik pendaftaran Prokeran.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">Hi, Super Admin</p>
            <p className="text-xs text-gray-400">Terakhir Diperbarui: {lastUpdated}</p>
          </div>
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            SA
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Total Proker</p>
            <FolderKanban className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{totalProker}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Pendaftar</p>
            <Users className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{totalPendaftar}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Pending</p>
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{waitingReview}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Diterima</p>
            <CheckCircle className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{accepted}</h3>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-gray-500 tracking-widest uppercase">Ditolak</p>
            <XCircle className="w-4 h-4 text-gray-400" />
          </div>
          <h3 className="text-3xl font-semibold text-gray-900">{rejected}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-base text-gray-900">
              Statistik Pendaftar per Proker
            </h3>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="Pendaftar" fill="#0038FF" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-base mb-6 text-gray-900">
            Aktivitas Terbaru
          </h3>
          <div className="flex-1 space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4 relative">
                {index !== activities.length - 1 && (
                  <div className="absolute top-8 left-4 bottom-[-24px] w-px bg-gray-200"></div>
                )}
                <div className="w-8 h-8 rounded-full border border-gray-200 bg-white flex-shrink-0 flex items-center justify-center z-10 relative">
                  <activity.icon className="w-3.5 h-3.5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>

      {/* Recent Applicants Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-semibold text-base text-gray-900">
            Pendaftar Terbaru
          </h3>
          <a href="/admin/pendaftar" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Lihat Semua
          </a>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 hover:bg-transparent">
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Nama Lengkap</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Proker</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Divisi</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Tanggal</TableHead>
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wider h-10">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplicants.length > 0 ? (
                recentApplicants.map((app) => (
                  <TableRow key={app.id} className="border-gray-200 hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-900 text-sm py-3">{app.full_name}</TableCell>
                    <TableCell className="text-gray-600 text-sm py-3">{app.proker_title}</TableCell>
                    <TableCell className="text-gray-600 text-sm py-3">{app.division_name}</TableCell>
                    <TableCell className="text-gray-500 text-sm py-3">
                      {new Date(app.registered_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell className="py-3">{getStatusBadge(app.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-gray-400 font-medium bg-gray-50/30">
                    Belum ada pendaftar terbaru.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
