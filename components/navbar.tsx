"use client"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import {Menu} from "lucide-react";

export default function Navbar() {
    const {status} = useSession()
    const isAuthenticated = status === "authenticated"
    const isLoading = status === "loading"


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
                            <li>
                                <button onClick={() => signOut({callbackUrl: "/", redirect: true})}>Logout</button>
                            </li>
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
        <>
            <div className="drawer z-10 ">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                <div className="drawer-content flex flex-col  ">
                    {/* Navbar */}
                    <div className={"shadow-md  "}>
                        <div className="navbar container mx-auto ">
                            <div className="mx-2 flex-1 px-2">Navbar Title</div>
                            <div className="flex lg:hidden">
                                <label htmlFor="my-drawer-3" aria-label="open sidebar"
                                       className="btn btn-square btn-ghost">
                                    <Menu/>
                                </label>
                            </div>
                            <div className="hidden flex-none lg:block">
                                <ul className="menu menu-horizontal">
                                    {/* Navbar menu content here */}
                                    <li><a>Navbar Item 1</a></li>
                                    <li><a>Navbar Item 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 min-h-full w-52 p-4">
                        <li><a>Sidebar Item 1</a></li>
                        <li><a>Sidebar Item 2</a></li>
                    </ul>
                </div>
            </div>
        </>
    )
}