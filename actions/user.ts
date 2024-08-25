"use server"
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {loginSchema, signupSchema} from "@/schemas/authSchema";

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
                team: {
                    create: {
                        name: "Personal"
                    }
                }
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
            throw new Error("Email and password are required");
        }


        await signIn("credentials", {
            redirect: false,
            callbackUrl: "/",
            email: email as string,
            password: password as string
        })
    } catch (error) {
        throw new Error("Email or password is invalid")
    }
    redirect("/dashboard");

}