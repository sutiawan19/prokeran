"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // logic nya di set di code nya "khusus email me.sutiawan@gmail.com tetapi password nya masih bebas diisi apa saja"
    if (email === 'me.sutiawan@gmail.com') {
      // Set cookie untuk autentikasi (berlaku 1 hari)
      document.cookie = `admin_auth=true; path=/; max-age=86400`;
      document.cookie = `admin_email=${email}; path=/; max-age=86400`;
      
      router.push('/admin');
      router.refresh(); // Memaksa refresh agar layout & middleware mendeteksi cookie baru
    } else {
      setError('Akses ditolak. Email tidak terdaftar sebagai admin.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4 relative overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#0038FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden z-10">
        {/* Banner header matching detail proker banner exactly */}
        <div className="h-32 bg-gradient-to-r from-[#0038FF]/20 to-purple-500/20 relative">
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-md border border-black/5">
              <div className="w-12 h-12 bg-[#0038FF] rounded-xl flex items-center justify-center shadow-inner">
                <span className="text-white font-black text-base">PR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="pt-16 px-8 pb-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-black">Login Admin</h1>
            <p className="text-black/50 text-sm mt-1 font-medium">
              Masuk untuk mengelola Program Kerja
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 text-red-600 rounded-xl flex items-start gap-2.5 text-xs font-semibold border border-red-100 mb-4 animate-in fade-in-50 duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-black/80">Alamat Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="me.sutiawan@gmail.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#0038FF]/50 transition-all text-sm outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-black/80">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Masukkan password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 h-11 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-[#0038FF]/50 transition-all text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full h-11 bg-[#0038FF] hover:bg-[#0038FF]/90 text-white font-bold rounded-xl shadow-sm transition-all text-sm cursor-pointer">
                Masuk ke Dashboard
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
