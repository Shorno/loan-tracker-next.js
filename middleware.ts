import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
    const session = await auth()

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/')
    const isLandingPage = request.nextUrl.pathname === '/'

    if (!session && !isPublicRoute && !isLandingPage) {
        // User is not logged in and trying to access a protected route
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (session){
        if (isAuthRoute || isLandingPage){
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}