import Link from 'next/link';
import { Camera, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t-[4px] border-black bg-white pt-12 pb-8">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b-[3px] border-black pb-12 mb-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-1 group w-max">
              <div className="bg-white text-black font-black tracking-tight text-lg px-4 py-2 rounded-[1.5rem] rounded-bl-sm relative shadow-sm border-[2px] border-black group-hover:-translate-y-1 transition-transform">
                UKM
                <div className="absolute -bottom-2 left-0 w-4 h-4 bg-white border-b-[2px] border-r-[2px] border-black" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
              </div>
              <div className="bg-[#CCFF00] text-black font-black text-lg px-4 py-2 rounded-full border-[2px] border-black shadow-sm group-hover:scale-105 transition-transform">
                PROKER
              </div>
            </Link>
            <p className="text-sm font-bold leading-relaxed max-w-sm">
              Berkreasi, Berinovasi, Menginspirasi. Unit Kegiatan Mahasiswa yang berfokus pada pengembangan kreativitas digital.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-[#CCFF00] border-[2px] border-black flex items-center justify-center hover:bg-[#0038FF] hover:text-white hover:scale-110 transition-all shadow-[4px_4px_0_0_black]"
                aria-label="Instagram"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-[#0038FF] text-white border-[2px] border-black flex items-center justify-center hover:bg-[#CCFF00] hover:text-black hover:scale-110 transition-all shadow-[4px_4px_0_0_black]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-xl uppercase tracking-wider mb-2">
              Tautan
            </h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Beranda' },
                { href: '/cek-status', label: 'Cek Status Pendaftaran' },
                { href: '/admin/login', label: 'Admin Dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold uppercase hover:text-[#0038FF] hover:underline decoration-[3px] underline-offset-4 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-black text-xl uppercase tracking-wider mb-2">
              Hubungi Kami
            </h3>
            <div className="bg-[#F8F9FA] border-[3px] border-black p-5 rounded-2xl shadow-[6px_6px_0_0_black] rotate-1 hover:rotate-0 transition-transform">
              <p className="text-sm font-bold mb-3">Pusat Kegiatan Mahasiswa (PKM)<br/>Lantai 2, Ruang 204</p>
              <a href="mailto:hello@ukmkreasi.ac.id" className="inline-block bg-[#0038FF] text-white font-bold text-xs uppercase px-4 py-2 rounded-full border-[2px] border-black hover:bg-[#CCFF00] hover:text-black transition-colors">
                hello@ukmkreasi.ac.id
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 font-bold text-xs uppercase">
          <p>
            &copy; {new Date().getFullYear()} PROKERAN YUK.
          </p>
          <p className="flex items-center gap-1">
            Built with <span className="text-[#0038FF] text-lg">♥</span> in Campus
          </p>
        </div>
      </div>
    </footer>
  );
}
