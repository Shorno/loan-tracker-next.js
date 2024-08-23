import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/auth'

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup']

export async function middleware(request: NextRequest) {
    const session = await auth()

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname)
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/')

    if (!session && !isPublicRoute) {
        // User is not logged in and trying to access a protected route
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (session && isAuthRoute) {
        // User is logged in and trying to access auth routes (login, signup)
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}