"use client"
import Link from "next/link";
import {loginAction} from "@/actions/user";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/schemas/authSchema";
import {z} from "zod";
import {CircleAlert, Loader} from "lucide-react";

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
    const [serverError, setServerError] = useState("");

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormData>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });


    const onSubmit = async (data: LoginFormData) => {
        try {
            await loginAction(data);
        } catch (error) {
            if (error instanceof Error) {
                setServerError(error.message);
            } else {
                setServerError("Unexpected server error occurred. Please try again.");
            }
        }
    }
    return (
        <>
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Welcome Back!</h1>
                            <p className="py-6">
                                Please login to continue using LoanTracker and manage your loans efficiently.
                            </p>
                        </div>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleSubmit(onSubmit)}
                                  className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Please enter your email"
                                        {...register("email")}
                                        className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                                    />
                                    {errors.email &&
                                        <span className="text-error text-xs mt-1">{String(errors.email.message)}</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                        className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                                    />
                                    {errors.password &&
                                        <span className="text-error text-xs mt-1">{String(errors.password.message)}</span>}
                                </div>

                                {serverError && <div className="text-error text-sm mt-2 flex gap-2 items-center justify-center align-text-top">
                                    <CircleAlert size={20}/>
                                    {serverError}
                                </div>}

                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader className="animate-spin"/> : "Login"}
                                    </button>
                                </div>
                                <label className="label py-4">
                                    <p>Don&apos;t have an account?</p> <p><Link href={"/auth/signup"}
                                                                                className="link link-hover">Sign
                                    Up</Link></p>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}