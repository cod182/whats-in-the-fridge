// import type { NextRequest } from 'next/server'
// import { NextResponse } from 'next/server'
// import isAuthenticated from './utilities/Auth';

// export async function middleware(req: NextRequest) {

//   let auth = await isAuthenticated();

//   if (auth && req.nextUrl.pathname === '/login') {
//     const absoluteURL = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// };

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }

import { NextRequest, NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

import { getToken } from 'next-auth/jwt';

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith('/login') && isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/appliance') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', req.url));
  }


  return await withAuth(req as NextRequestWithAuth, {
    // Specify the login page
    pages: {
      signIn: '/login',
    }
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