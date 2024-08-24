"use server"
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import {redirect} from "next/navigation";
import {signIn} from "@/auth";
import {signupSchema} from "@/schemas/authSchema";
import {Prisma} from "@prisma/client";


export const signupAction = async (data: any) => {
    try {
        const validatedData = signupSchema.parse(data);

        const {name, email, password} = validatedData;

        const existingUser = await prisma.user.findUnique({
            where: {email}
        });

        if (existingUser) {
            throw new Error(`${email} is already registered.`);
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
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                throw new Error("A user with this email already exists.");
            }
        } else if (error instanceof Prisma.PrismaClientValidationError) {
            throw new Error("Invalid data provided. Please check your input and try again.");
        } else if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Unexpected server error occurred. Please try again.");
    }
    redirect("/auth/login");

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