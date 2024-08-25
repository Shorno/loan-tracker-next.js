"use server"
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {loginSchema, signupSchema} from "@/schemas/authSchema";
import {AuthError} from "next-auth";

export const signupAction = async (data: any) => {
    try {
        const validatedSignupData = signupSchema.parse(data);

        const {name, email, password} = validatedSignupData;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            return {error: `${email} is already registered.`}
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,

            }
        });
        console.log("User created successfully");
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message}
        }
        return {error: "Unexpected server error occurred. Please try again"};
    }
    redirect("/auth/login");
}


export const loginAction = async (data: any) => {
    try {

        const validatedLoginData = loginSchema.parse(data);

        const {email, password} = validatedLoginData;

        if (!email || !password) {
            return {error: "Email and password are required"};
        }


        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email: email as string,
            password: password as string
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    if (error.message && error.message.includes("Password")) {
                        return {error: "Password is incorrect. Please check your password and try again."};
                    } else if (error.message && error.message.includes("Email")) {
                        return {error: "Email is not associated with any LoanTrack account."};
                    }
            }
        }
        return {error: "Unexpected server error occurred. Please try again."};
    }
    redirect("/dashboard");

}

export const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });
}