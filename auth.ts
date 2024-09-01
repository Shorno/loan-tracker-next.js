import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import prisma from "@/prisma/db";
import bcrypt from "bcryptjs";
import Credentials from "@auth/core/providers/credentials";
import {CredentialsSignin} from "@auth/core/errors"
import Google from "@auth/core/providers/google";

class UserNotFound extends CredentialsSignin {
    code = "404";
}

class InvalidCredentials extends CredentialsSignin {
    code = "401";
}

class InvalidPassword extends CredentialsSignin {
    code = "401";
}

export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
           clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            authorization : {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                }
            }
        }),
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
                    throw new CredentialsSignin("Email and password are required");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: email,
                    }
                });

                if (!user) {
                    throw new UserNotFound();
                }
                if (!user.password) {
                    throw new InvalidCredentials()
                }

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    throw new InvalidPassword();
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                };
            }
        })
    ],
    pages: {
        signIn: "/new-login",
        signOut: "/auth/logout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },

        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    secret: process.env.AUTH_SECRET,
});