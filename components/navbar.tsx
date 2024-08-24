"use client"

import { useState } from "react"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import {Menu, X} from "lucide-react"

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const {status} = useSession()
    const isAuthenticated = status === "authenticated"
    const isLoading = status === "loading"

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

    const NavItems = () => (
        <>
            {isAuthenticated && (
                <li>
                    <Link href={"/dashboard"} className="lg:hover:text-primary">
                        Dashboard
                    </Link>
                </li>
            )}
            {!isLoading && (
                <>
                    {isAuthenticated ? (
                        <>
                            <li><Link href={"/profile"}>Profile</Link></li>
                            <li><button onClick={()=> signOut()}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href={"/auth/login"} className="font-semibold">Log in</Link></li>
                            <li><Link href={"/auth/signup"} className="text-blue-700 font-semibold">Sign up</Link></li>
                        </>
                    )}
                </>
            )}
        </>
    )

    return (
        <header className="sticky top-0 z-50 bg-base-100 shadow-md">
            <div className="navbar container mx-auto px-4">
                <div className="flex-1">
                    <Link href="/" className="flex gap-2 text-2xl font-extrabold bg-gradient-to-r from-black  to-blue-600 text-transparent bg-clip-text">
                        LoanTrack
                    </Link>
                </div>
                <div className="flex-none hidden md:block">
                    <ul className="menu menu-horizontal px-1">
                        <NavItems />
                    </ul>
                </div>
                <div className="flex-none md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="btn btn-square btn-ghost"
                        aria-expanded={mobileMenuOpen}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`absolute left-0 right-0 bg-base-300 shadow-lg md:hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'top-full opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            >
                <nav className="bg-base-200 px-2 font-semibold text-zinc-900">
                    <ul className="menu menu-horizontal flex gap-4">
                        <NavItems />
                    </ul>
                </nav>
            </div>
        </header>
    )
}