"use server"
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";


export const signupAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword")

    if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all the fields");
    }

    const existingUser = await prisma.user.findUnique({
        where: {email: email as string}
    })

    if (existingUser) {
        throw new Error("User already exists")
    }

    const hashedPassword = await bcrypt.hash(password as string, 12);

    await prisma.user.create({
        data: {
            email: email as string,
            password: hashedPassword as string,

        }
    })

    console.log("User created successfully")
    redirect("/auth/login")
}

export const loginAction = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
        throw new Error("Please fill in all the fields");
    }

    try {
        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email: email as string,
            password: password as string
        })
    } catch (error) {
        throw new Error("Invalid email or password")
    }
    redirect("/")

}