import { NextRequest, NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  // Setting the Secure cookie
  // if (!req.cookies.has('next-auth.session-token') && req.cookies.has('__Secure-next-auth.session-token')) {
  //   console.log('Relaying auth cookie...');
  //   req.cookies.set({ ...req.cookies.get('__Secure-next-auth.session-token'), name: 'next-auth.session-token' });
  // }

  const url = new URL(req.url);
  const origin = url.origin;
  const pathname = url.pathname;
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-url', req.url);
  requestHeaders.set('x-origin', origin);
  requestHeaders.set('x-pathname', pathname);


  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/appliance') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/')) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      }
    });
  }

  return await withAuth(req as NextRequestWithAuth, {
    // Specify the login page
    pages: {
      signIn: '/login',
    },

  });
}

// specify on which routes you want to run the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

