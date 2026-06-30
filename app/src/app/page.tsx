'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockProkers } from '@/lib/mock-data';
import { Search, Calendar, Users } from 'lucide-react';

// --- Custom SVG Components for Hand-Drawn Accents ---

const ArrowGreenLeft = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,90 C 10,40 40,20 60,50 C 70,65 80,75 95,70" />
    <path d="M80,55 L95,70 L85,85" />
  </svg>
);

const ArrowGreenRight = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-[#CCFF00] stroke-current overflow-visible" fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M90,10 C 80,60 60,80 40,60 C 20,40 40,20 60,30 C 80,40 70,70 50,80" />
    <path d="M65,75 L50,80 L55,65" />
  </svg>
);

const ArrowBlack1 = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full text-black stroke-current overflow-visible" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20,80 Q 40,20 80,40" />
    <path d="M60,20 L80,40 L50,60" />
  </svg>
);

const CircularBadge = () => (
  <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-black/5">
    <div className="absolute inset-1 animate-[spin_10s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        <text className="text-[11px] font-black tracking-[0.18em] uppercase" fill="black">
          <textPath href="#circlePath" startOffset="0%">
            CEK STATUS PENDAFTARAN!  •
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-10 h-10 text-black stroke-current overflow-visible" fill="none" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20,80 Q 40,50 30,30 T 80,20" />
        <path d="M60,10 L80,20 L70,40" />
      </svg>
    </div>
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      router.push(`/cek-status?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0038FF] flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black relative overflow-hidden w-full">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-10 md:py-8 max-w-[1440px] mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <div className="bg-white text-black font-black tracking-tight text-xs md:text-sm px-3 py-1.5 rounded-2xl rounded-bl-sm relative shadow-sm">
            UKM
            <div className="absolute -bottom-1.5 left-0 w-3 h-3 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          </div>
          <div className="bg-[#CCFF00] text-black font-black text-xs md:text-sm px-3 py-1.5 rounded-full border-[1.5px] border-white shadow-sm">
            PROKER
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-2">
          {['Beranda', 'Cek Status', 'Admin'].map((item) => (
            <Link key={item} href={item === 'Cek Status' ? '/cek-status' : '#'} className="px-4 py-1.5 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-colors">
              {item}
            </Link>
          ))}
        </div>

        {/* Connect Button */}
        <Link href="#proker" className="px-6 py-2 rounded-full border border-white text-white text-xs md:text-sm font-semibold hover:bg-white hover:text-[#0038FF] transition-colors">
          Daftar Sekarang
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 pt-8 pb-32 md:pt-12 md:pb-48 px-4 flex flex-col items-center justify-center w-full max-w-[1440px] mx-auto">
        
        {/* Massive Typography & Elements Container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 mt-4 mb-16">
          
          {/* Text Stack */}
          <div className="w-full flex flex-col items-center relative z-10 space-y-2 md:space-y-4">
            
            {/* #UKM */}
            <div className="w-full flex justify-start pl-[10%] md:pl-[25%] relative z-30">
              <h1 
                className="text-[clamp(4.5rem,12vw,160px)] font-black leading-[0.85] tracking-tighter text-[#CCFF00] m-0 p-0 uppercase"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99, 13px 13px 0 #001A99, 14px 14px 0 #001A99'
                }}
              >
                #UKM
              </h1>
            </div>
            
            {/* PROKER */}
            <div className="w-full flex justify-center relative z-20">
              <h1 
                className="text-[clamp(5rem,15vw,220px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99, 13px 13px 0 #001A99, 14px 14px 0 #001A99'
                }}
              >
                PROKER
              </h1>
            </div>
            
            {/* PORTAL */}
            <div className="w-full flex justify-start pl-[15%] md:pl-[30%] relative z-10">
              <h1 
                className="text-[clamp(4.5rem,12vw,160px)] font-black leading-[0.85] tracking-tighter text-white m-0 p-0 uppercase"
                style={{ 
                  fontFamily: '"Arial Black", Impact, sans-serif',
                  textShadow: '1px 1px 0 #001A99, 2px 2px 0 #001A99, 3px 3px 0 #001A99, 4px 4px 0 #001A99, 5px 5px 0 #001A99, 6px 6px 0 #001A99, 7px 7px 0 #001A99, 8px 8px 0 #001A99, 9px 9px 0 #001A99, 10px 10px 0 #001A99, 11px 11px 0 #001A99, 12px 12px 0 #001A99, 13px 13px 0 #001A99, 14px 14px 0 #001A99'
                }}
              >
                PORTAL
              </h1>
            </div>

          </div>

          {/* Absolute Overlays (Search Box, Arrows, Badge) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            
            {/* Floating Glass Card 1 (Bottom Left) -> Replaced with Search Box */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[5%] left-[5%] md:left-[20%] z-40 pointer-events-auto"
            >
              <div className="w-[300px] md:w-[350px] bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] p-5 shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <h3 className="text-white font-bold mb-3 text-lg">Cek Status Pendaftaran</h3>
                <form onSubmit={handleSearch} className="relative flex items-center">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-white/70" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Nama Lengkap / No. HP..."
                    className="w-full bg-white/10 border border-white/30 text-white placeholder-white/50 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#CCFF00] focus:border-transparent transition-all"
                  />
                  <button type="submit" className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#CCFF00] text-[#0038FF] hover:bg-white font-bold rounded-full px-4 text-sm transition-colors">
                    Cek
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Floating Glass Card 2 (Top Right) */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[15%] right-[5%] md:right-[22%] z-30 pointer-events-auto"
            >
              <div className="w-40 md:w-52 aspect-[3/3.5] bg-white/20 backdrop-blur-md border border-white/40 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[12deg] shadow-2xl hover:rotate-0 transition-transform duration-500">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-[#CCFF00] rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white/50 overflow-hidden text-4xl">
                  🚀
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold text-sm md:text-lg text-white">4 Proker Aktif</p>
                  <p className="text-[10px] md:text-xs text-white/80 mt-1">Daftar tanpa login</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Arrow Left */}
            <div className="absolute bottom-[0%] left-[0%] md:left-[10%] w-24 h-24 md:w-32 md:h-32 z-20">
              <ArrowGreenLeft />
            </div>

            {/* Decorative Arrow Right */}
            <div className="absolute top-[5%] right-[0%] md:right-[10%] w-24 h-24 md:w-32 md:h-32 z-20">
              <ArrowGreenRight />
            </div>

            {/* Circular Badge */}
            <div className="absolute bottom-[-10%] right-[0%] md:right-[15%] z-40 pointer-events-auto">
              <Link href="#proker">
                <CircularBadge />
              </Link>
            </div>

          </div>
        </div>
      </main>

      {/* Bottom Features Section (List Card Proker) */}
      <section id="proker" className="bg-white text-black rounded-t-[2.5rem] md:rounded-t-[3.5rem] px-6 py-12 md:px-10 md:py-16 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.2)] mt-auto w-full">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-center">
              Pilih Proker Kamu
            </h2>
            <div className="w-24 h-2 bg-[#CCFF00] mt-4 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mockProkers.map((proker, i) => (
              <div key={proker.id} className="bg-[#F8F9FA] rounded-[2rem] p-6 flex flex-col relative h-full min-h-[360px] border-[3px] border-black/5 hover:border-[#0038FF] hover:-translate-y-2 transition-all duration-300 overflow-hidden group">
                
                {/* Status Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 ${
                    proker.status === 'ongoing' 
                      ? 'bg-[#CCFF00] text-black border-black/10' 
                      : proker.status === 'upcoming'
                        ? 'bg-[#0038FF] text-white border-white/20'
                        : 'bg-black text-white border-black'
                  }`}>
                    {proker.status === 'ongoing' ? 'Daftar Buka' : proker.status === 'upcoming' ? 'Segera' : 'Selesai'}
                  </span>
                </div>

                {/* Banner / Pattern Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gray-200 overflow-hidden rounded-t-[1.75rem]">
                  {proker.banner_url ? (
                    <img src={proker.banner_url} alt={proker.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-[#0038FF]/10 flex items-center justify-center opacity-50">
                      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z" fill="#0038FF" fillOpacity="0.1" fillRule="evenodd"/>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="relative mt-24 pt-4 flex-1 flex flex-col bg-[#F8F9FA] rounded-t-[2rem]">
                  <h3 className="text-xl md:text-2xl uppercase leading-tight mb-2 font-black line-clamp-2">
                    {proker.title}
                  </h3>
                  
                  <div className="mt-4 space-y-2 text-sm font-bold text-black/70 mb-auto">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-black/70 shrink-0" strokeWidth={3} /> {new Date(proker.start_date!).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(proker.end_date!).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-black/70 shrink-0" strokeWidth={3} /> {proker.divisions?.length || 0} Divisi Tersedia
                    </p>
                  </div>
                  
                  <div className="w-full mt-6">
                    <Link href={`/proker/${proker.slug}`} className="flex items-center justify-center w-full bg-[#0038FF] hover:bg-black rounded-full py-4 text-white font-bold text-sm transition-colors group-hover:shadow-lg">
                      Lihat Detail
                      <svg viewBox="0 0 24 24" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </div>
                </div>


              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
