"use client"
import Link from "next/link";
import {Menu, X} from "lucide-react";
import {useState} from "react";


export default function Navbar() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }
    return (
        <>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href={"/"} className="flex-shrink-0">
                                <span className="text-2xl font-bold text-indigo-600">LoanTracker</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href={"/dashboard"}
                                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150 ease-in-out">Dashboard</Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <Link href={"/auth/login"}
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                                Log in
                            </Link>
                            <Link href={"/auth/signup"}
                                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                                Sign up
                            </Link>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {mobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true"/>
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true"/>
                                )}
                            </button>
                        </div>
                    </div>
                </nav>

                {mobileMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">

                            <Link href={"/dashboard"}
                                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Dashboard</Link>

                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-5">
                                <Link href={"/auth/login"}
                                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50">Log
                                    in</Link>
                                <Link href={"/auth/signup"}
                                      className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">Sign
                                    up</Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}