"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash, UserCog, Search, Shield, Settings, Key, Upload, Save, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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

// Mock Initial Data
const initialAdmins = [
  { id: '1', name: 'M. Sutiawan', email: 'me.sutiawan@gmail.com', last_login: '2026-07-06T10:30:00Z', is_active: true },
  { id: '2', name: 'Admin Staff', email: 'admin@prokeran.com', last_login: '2026-07-05T14:15:00Z', is_active: true },
  { id: '3', name: 'Alumni Pengurus', email: 'alumni@prokeran.com', last_login: '2025-12-01T08:00:00Z', is_active: false },
];

export default function PengaturanPage() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dialogs
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    is_active: true
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // System Settings State
  const [systemSettings, setSystemSettings] = useState<{
    ukmName: string;
    activeYear: string;
    recruitmentOpen: boolean;
    logoUrl: string | null;
  }>({
    ukmName: 'UKM Inovasi Teknologi',
    activeYear: '2026/2027',
    recruitmentOpen: true,
    logoUrl: null,
  });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSystemSettings(prev => ({
          ...prev,
          logoUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Derived Admin Stats
  const activeAdmins = admins.filter(a => a.is_active).length;

  // Filter & Pagination
  const filteredAdmins = admins.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenAddDialog = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', password: '', is_active: true });
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (admin: typeof initialAdmins[0]) => {
    setEditingId(admin.id);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: '', // Kosongkan password saat edit, hanya diisi jika ingin diubah
      is_active: admin.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string, email: string) => {
    if (email === 'me.sutiawan@gmail.com') {
      alert('Akun utama Anda tidak dapat dihapus!');
      return;
    }
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin menghapus admin ini?')) {
      setAdmins(admins.filter(a => a.id !== id));
      if (paginatedAdmins.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Edit
      setAdmins(admins.map(a => a.id === editingId ? { ...a, name: formData.name, email: formData.email, is_active: formData.is_active } : a));
    } else {
      // Add
      const newAdmin = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        last_login: new Date().toISOString(),
        is_active: formData.is_active
      };
      setAdmins([newAdmin, ...admins]);
    }
    
    setIsDialogOpen(false);
  };

  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Pengaturan sistem berhasil disimpan!');
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">Pengaturan</h1>
          <p className="text-black/60 font-medium mt-1">Kelola akun admin dan konfigurasi sistem aplikasi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Admin Management */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0038FF]/10 text-[#0038FF] flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-black/50 uppercase">Total Admin</p>
                <h3 className="text-2xl font-black">{admins.length}</h3>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-black/50 uppercase">Admin Aktif</p>
                <h3 className="text-2xl font-black">{activeAdmins}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0038FF] flex items-center justify-center">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Daftar Admin</h2>
                  <p className="text-sm text-black/60">Kelola akun yang memiliki akses ke dashboard ini.</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                  <Input 
                    placeholder="Cari admin..." 
                    className="pl-10 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#0038FF]/50"
                    value={searchQuery}
                    onChange={(e) => {setSearchQuery(e.target.value); setCurrentPage(1);}}
                  />
                </div>
                <Button onClick={handleOpenAddDialog} className="bg-[#0038FF] hover:bg-[#0038FF]/90 text-white font-bold whitespace-nowrap">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="font-bold text-black">Nama Lengkap</TableHead>
                    <TableHead className="font-bold text-black">Terakhir Login</TableHead>
                    <TableHead className="font-bold text-black text-center">Status</TableHead>
                    <TableHead className="font-bold text-black text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TooltipProvider>
                    {paginatedAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          <p className="font-bold">{admin.name}</p>
                          <p className="text-xs text-black/50 font-normal">{admin.email}</p>
                        </TableCell>
                        <TableCell className="text-sm text-black/70">
                          {new Date(admin.last_login).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          {admin.is_active ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Aktif</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none">Nonaktif</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Tooltip>
                              <TooltipTrigger render={<span className="inline-flex" />}>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                                  onClick={() => handleOpenEditDialog(admin)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent><p>Edit & Ubah Password</p></TooltipContent>
                            </Tooltip>
                            
                            <Tooltip>
                              <TooltipTrigger render={<span className="inline-flex" />}>
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className={`h-8 w-8 ${admin.email === 'me.sutiawan@gmail.com' ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                                  onClick={() => handleDelete(admin.id, admin.email)}
                                  disabled={admin.email === 'me.sutiawan@gmail.com'}
                                >
                                  <Trash className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent><p>{admin.email === 'me.sutiawan@gmail.com' ? 'Tidak dapat dihapus' : 'Hapus Admin'}</p></TooltipContent>
                            </Tooltip>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TooltipProvider>
                  {paginatedAdmins.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-10 text-black/50">
                        Tidak ada data admin ditemukan.
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
                  Halaman {currentPage} dari {totalPages}
                </span>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Prev</Button>
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: System Settings */}
        <div className="space-y-6">
          <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Pengaturan Sistem</h2>
                  <p className="text-sm text-black/60">Konfigurasi dasar website.</p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSaveSystemSettings} className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="ukmName">Nama UKM / Organisasi</Label>
                <Input 
                  id="ukmName" 
                  value={systemSettings.ukmName} 
                  onChange={(e) => setSystemSettings({...systemSettings, ukmName: e.target.value})} 
                />
              </div>

              <div className="space-y-2">
                <Label>Logo UKM</Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-100 border flex items-center justify-center overflow-hidden">
                    {systemSettings.logoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={systemSettings.logoUrl} alt="Logo UKM" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-black/30 font-bold text-xs">LOGO</span>
                    )}
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4" /> Upload Baru
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleLogoUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activeYear">Tahun Kepengurusan Aktif</Label>
                <Input 
                  id="activeYear" 
                  value={systemSettings.activeYear} 
                  onChange={(e) => setSystemSettings({...systemSettings, activeYear: e.target.value})} 
                />
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-bold text-black">Status Rekrutmen Global</Label>
                    <p className="text-sm text-black/60">Buka atau tutup form pendaftaran untuk semua proker.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={systemSettings.recruitmentOpen}
                      onChange={(e) => setSystemSettings({...systemSettings, recruitmentOpen: e.target.checked})}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0038FF]"></div>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-black text-white hover:bg-black/80 font-bold gap-2">
                <Save className="w-4 h-4" /> Simpan Pengaturan
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Admin Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Profil Admin' : 'Tambah Admin Baru'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                required
                disabled={editingId !== null && formData.email === 'me.sutiawan@gmail.com'}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Key className="w-4 h-4" /> Password
              </Label>
              <Input 
                id="password" 
                type="password"
                placeholder={editingId ? "Biarkan kosong jika tidak ingin mengubah" : "Masukkan password awal"}
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                required={!editingId}
              />
            </div>

            <div className="flex items-center justify-between mt-2 pt-4 border-t">
              <Label htmlFor="is_active" className="cursor-pointer">Status Akun Aktif</Label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="is_active"
                  className="sr-only peer" 
                  checked={formData.is_active}
                  onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                  disabled={editingId !== null && formData.email === 'me.sutiawan@gmail.com'}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-[#0038FF] hover:bg-[#0038FF]/90 font-bold">
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
