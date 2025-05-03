import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that require authentication
const protectedPaths = [
  '/api/blogs',
  '/api/addPost',
  '/api/updatePost',
  '/api/deletePost',
  '/dashboard',
  '/',
  '/blogs*',	
  '/upload',
];

// Paths that are public (don't require authentication)
const publicPaths = [
  '/api/auth',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if path should be protected
  const isPathProtected = protectedPaths.some(protectedPath => 
    path.startsWith(protectedPath)
  );
  
  // Skip middleware for public paths
  const isPublicPath = publicPaths.some(publicPath => 
    path.startsWith(publicPath)
  );
  
  if (!isPathProtected || isPublicPath) {
    return NextResponse.next();
  }
  
  // Get the token and validate authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  
  // Redirect to login if not authenticated
  if (!token) {
    const url = new URL('/api/auth/signin', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // Continue to protected route if authenticated
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};