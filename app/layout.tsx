import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "react-hot-toast";
import Navbar from "@/components/navbar";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Loan Track",
    description: "Loan Track is a simple loan tracking application",
    icons: {
        icon: "/favicon.png",
    }
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await auth()


    return (
        <html lang="en" data-theme={"light"}>
        <body className={inter.className}>
        <SessionProvider session={session}>
            <Navbar/>
            {children}
            <Toaster position={"top-center"}/>
        </SessionProvider>
        </body>
        </html>
    );
}
