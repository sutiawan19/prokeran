"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Settings,
  LogOut
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Kelola Proker',
    href: '/admin/proker',
    icon: FolderKanban,
  },
  {
    title: 'Review Pendaftar',
    href: '/admin/pendaftar',
    icon: Users,
  },
  {
    title: 'Pengaturan',
    href: '/admin/pengaturan',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // Clear cookies
    document.cookie = "admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "admin_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Redirect to login page
    window.location.href = '/admin/login';
  };

  return (
    <div className="w-64 border-r bg-white h-screen flex flex-col sticky top-0 hidden md:flex">
      <div className="p-6 border-b">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0038FF] rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">PR</span>
          </div>
          <span className="font-black text-xl tracking-tight text-black">
            PROKERAN
          </span>
        </Link>
        <p className="text-xs font-medium text-black/50 mt-1 uppercase tracking-wider">Admin Panel</p>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm",
                isActive 
                  ? "bg-[#0038FF] text-white shadow-md shadow-[#0038FF]/20" 
                  : "text-black/60 hover:bg-black/5 hover:text-black"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-bold text-sm text-red-500 hover:bg-red-50 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
