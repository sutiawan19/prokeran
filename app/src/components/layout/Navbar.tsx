'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/cek-status', label: 'Cek Status' },
  { href: '/admin/login', label: 'Admin' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0038FF] shadow-sm">
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 md:px-10 md:py-5 max-w-[1440px] mx-auto w-full">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 group">
          <div className="bg-white text-black font-black tracking-tight text-xs md:text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm group-hover:-translate-y-1 transition-transform">
            UKM
            <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          </div>
          <div className="bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm group-hover:scale-105 transition-transform">
            PROKER
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <Link href="/#proker" className="hidden md:block px-6 py-2 rounded-full border border-white text-white text-xs md:text-sm font-semibold hover:bg-white hover:text-[#0038FF] transition-colors">
            Daftar Sekarang
          </Link>

          {/* Mobile Hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors border border-transparent focus:border-white"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-6 h-6 text-white" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-[#0038FF] border-l-0 text-white p-6 shadow-xl">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-xl border border-white/20 font-semibold text-sm hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-[1px] bg-white/20 my-2" />
                <Link
                  href="/#proker"
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl bg-white text-[#0038FF] font-bold text-sm text-center hover:bg-gray-100 transition-colors"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </nav>
    </header>
  );
}
