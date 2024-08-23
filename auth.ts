import NextAuth, {CredentialsSignin} from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/prisma/db";
import Credentials from "@auth/core/providers/credentials";
import bcrypt from "bcryptjs";

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email",
                    required: true
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "password",
                    required: true
                }
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and a password");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                });

                if (!user) {
                    throw new CredentialsSignin("Email is not associated with any account");
                }
                if (!user.password) {
                    throw new CredentialsSignin("Invalid email or password");
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    throw new CredentialsSignin("Password is incorrect");
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    pages :{
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    session: {
        strategy: "jwt",
    },
    callbacks : {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({session, token}) {
           if (session.user){
               session.user.id = token.id as string;
           }
              return session;
        }
    },
    secret: process.env.AUTH_SECRET,
});