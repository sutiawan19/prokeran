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
          <h1 className="text-3xl font-black uppercase tracking-tight">Dashboard Admin</h1>
          <p className="text-black/60 font-medium mt-1">Ringkasan aktivitas dan statistik pendaftaran Prokeran.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-black/80">Hi, Super Admin</p>
            <p className="text-xs text-black/50">Last Updated: {lastUpdated}</p>
          </div>
          <button className="relative p-2 rounded-full hover:bg-black/5 transition-colors">
            <Bell className="w-5 h-5 text-black/70" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-10 h-10 rounded-full bg-[#0038FF] text-white flex items-center justify-center font-bold text-sm">
            SA
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-3">
            <FolderKanban className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">Total Proker</p>
          <h3 className="text-2xl font-black mt-1">{totalProker}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">Pendaftar</p>
          <h3 className="text-2xl font-black mt-1">{totalPendaftar}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">Pending</p>
          <h3 className="text-2xl font-black mt-1">{waitingReview}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600 mb-3">
            <CheckCircle className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">Diterima</p>
          <h3 className="text-2xl font-black mt-1">{accepted}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600 mb-3">
            <XCircle className="w-5 h-5" />
          </div>
          <p className="text-xs font-bold text-black/50 uppercase tracking-wider">Ditolak</p>
          <h3 className="text-2xl font-black mt-1">{rejected}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <Activity className="w-5 h-5 text-black/50" />
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
        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-black/50" />
            Aktivitas Terbaru
          </h3>
          <div className="flex-1 space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4 relative">
                {index !== activities.length - 1 && (
                  <div className="absolute top-8 left-5 bottom-[-24px] w-0.5 bg-gray-100"></div>
                )}
                <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${activity.bg} ${activity.color} z-10 relative`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black/80">{activity.text}</p>
                  <p className="text-xs text-black/40 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-bold text-[#0038FF] bg-[#0038FF]/5 rounded-xl hover:bg-[#0038FF]/10 transition-colors">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>

      {/* Recent Applicants Table */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-black/50" />
            Ringkasan Pendaftar Terbaru
          </h3>
          <a href="/admin/pendaftar" className="text-sm font-bold text-[#0038FF] hover:underline">
            Lihat Semua
          </a>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="font-bold text-black">Nama Lengkap</TableHead>
                <TableHead className="font-bold text-black">Proker</TableHead>
                <TableHead className="font-bold text-black">Divisi</TableHead>
                <TableHead className="font-bold text-black">Tanggal Daftar</TableHead>
                <TableHead className="font-bold text-black">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentApplicants.length > 0 ? (
                recentApplicants.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell className="text-black/70">{app.proker_title}</TableCell>
                    <TableCell className="text-black/70">{app.division_name}</TableCell>
                    <TableCell className="text-black/70 text-sm">
                      {new Date(app.registered_at).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-black/50">
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
