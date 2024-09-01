"use server"

import {signIn} from "@/auth";

export async function SigninWithGoogle(){
    await signIn("google", {redirectTo: "/dashboard"});
}