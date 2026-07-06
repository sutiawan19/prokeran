import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Cek apakah ini rute admin dan BUKAN halaman login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const adminAuth = request.cookies.get('admin_auth')?.value;
    
    if (!adminAuth || adminAuth !== 'true') {
      // Redirect ke login jika belum login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Jika mencoba mengakses login page tapi sudah login
  if (path === '/admin/login') {
    const adminAuth = request.cookies.get('admin_auth')?.value;
    if (adminAuth === 'true') {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
