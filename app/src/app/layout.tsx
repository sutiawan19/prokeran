import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | PROKERAN YUK',
    default: 'PROKERAN YUK — Portal Pendaftaran Proker',
  },
  description:
    'Portal pendaftaran program kerja (proker) UKM Kreasi Digital. Daftar divisi, cek status pendaftaran, dan download sertifikat digital.',
  keywords: ['UKM', 'program kerja', 'proker', 'pendaftaran', 'mahasiswa', 'sertifikat'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'UKM Kreasi Digital',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className="h-full"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
