"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
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
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
            <span className="text-white font-semibold text-xs tracking-wider">PR</span>
          </div>
          <span className="font-semibold text-lg tracking-tight text-gray-900">
            Prokeran
          </span>
        </Link>
        <p className="text-[11px] font-medium text-gray-400 mt-2 uppercase tracking-widest">Admin Panel</p>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm",
                isActive 
                  ? "bg-zinc-100 text-zinc-900 font-semibold" 
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.title}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Keluar
        </button>
      </div>
    </div>
  );
}
