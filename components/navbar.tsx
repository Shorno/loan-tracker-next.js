"use client"
import Link from "next/link"
import {signOut, useSession} from "next-auth/react"
import {Menu} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import SiteLogo from "@/public/loan-track-icon.png";
import {
    LogOut,
    Settings,
    User,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {usePathname} from "next/navigation";
import Image from "next/image";

export default function Navbar() {
    const {data: session, status} = useSession()
    const isAuthenticated = status === "authenticated"
    const isLoading = status === "loading"
    const path = usePathname();


    return (
        <>
            <div className="z-30">
                <div className="">
                    <div
                        className="navbar container fixed lg:relative mx-auto bg-base-100 lg:shadow-none z-10 shadow-md">
                        <div className="flex-1 flex items-center">
                            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                <Link href={"/"} className={"bg-gradient-to-r from-black to-blue-700 text-transparent bg-clip-text flex justify-center items-center gap-4"}>
                                    <Image src={SiteLogo} alt={"logo"} width={40} height={40}/>
                                    Loan Track
                                </Link>
                            </h1>
                        </div>

                        {!isLoading && (
                            <>
                                {isAuthenticated ? (
                                    <div className="flex items-center">
                                        <div className="hidden flex-none lg:block mr-4">
                                            <ul className="menu menu-horizontal gap-4">
                                                <li>
                                                    <Link href={"/dashboard"}
                                                          className={`${path === "/dashboard" ? "bg-base-300" : ""} `}>
                                                        Dashboard
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href={"/clients"}
                                                          className={`${path === "/clients" ? "bg-base-300" : ""} `}>
                                                        Clients
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Avatar className="size-7 cursor-pointer">
                                                    <AvatarImage
                                                        src={session?.user?.image || "https://github.com/shadcn.png"}/>
                                                    <AvatarFallback>{session?.user?.name?.[0] || 'U'}</AvatarFallback>
                                                </Avatar>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-40 bg-base-100">
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator className="bg-gray-300"/>
                                                <DropdownMenuGroup>
                                                    <DropdownMenuItem
                                                        className="hover:bg-zinc-800 rounded-md hover:text-base-200"
                                                    >
                                                        <User className="mr-2 h-4 w-4"/>
                                                        <Link href={"/profile"}>Profile</Link>

                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="hover:bg-zinc-800 rounded-md hover:text-base-200"
                                                    >
                                                        <Settings className="mr-2 h-4 w-4"/>
                                                        <span>Settings</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuGroup>
                                                <DropdownMenuSeparator className="bg-gray-300"/>
                                                <DropdownMenuItem
                                                    className="hover:bg-zinc-800 rounded-md hover:text-base-200"
                                                    onClick={() => signOut({
                                                        callbackUrl: "/auth/login",
                                                        redirect: true
                                                    })}
                                                >
                                                    <LogOut className="mr-2 h-4 w-4"/>
                                                    <span>Log out</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div className="flex lg:hidden ml-4">
                                            <label htmlFor="my-drawer-3" aria-label="open sidebar"
                                                   className="btn btn-square btn-ghost">
                                                <Menu/>
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex space-x-4">
                                        <Link href={"/auth/login"}
                                              className={`btn btn-outline btn-sm `}>
                                            Log in
                                        </Link>
                                        <Link href={"/auth/signup"} className="btn btn-primary btn-sm">Sign up</Link>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isAuthenticated && (
                <div className="drawer z-10">
                    <input id="my-drawer-3" type="checkbox" className="drawer-toggle"/>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-48 min-h-full bg-base-200">
                            <li>
                                <Link href={"/dashboard"} className={`${path === "/dashboard" ? "bg-base-300" : ""}`}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={"/clients"} className={`${path === "/clients" ? "bg-base-300" : ""}`}>
                                    Clients
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}