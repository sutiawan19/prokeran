"use client";

import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        {children}
      </div>
    );
  }

  return (
    <div 
      className="flex min-h-screen bg-[#FAFAFA]" 
      style={{ 
        '--border': 'oklch(0.92 0 0)', 
        '--input': 'oklch(0.92 0 0)',
        '--ring': 'oklch(0.45 0.31 264)', // Keep primary blue for focus rings
        '--radius': '0.75rem' // Slightly softer corners than brutalist 1rem
      } as React.CSSProperties}
    >
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
              <span className="text-white font-semibold text-xs tracking-wider">PR</span>
            </div>
            <span className="font-bold tracking-tight text-gray-900">
              PROKERAN
            </span>
          </div>
          <button className="p-2 -mr-2 text-black/70">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
