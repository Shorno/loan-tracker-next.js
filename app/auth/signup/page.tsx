"use client"
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {CircleAlert, Loader} from "lucide-react";
import {signupSchema} from "@/schemas/authSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import {signupAction} from "@/actions/user";
import {z} from "zod";


type SignupFormData = z.infer<typeof signupSchema>

export default function SignupForm() {
    const [serverError, setServerError] = useState("");

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<SignupFormData>({
        mode: "all",
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    });


    const onSubmit = async (data: SignupFormData) => {
        // setServerError("");
        try {
            const response = await signupAction(data);

            if (response?.error) {
                setServerError(response.error);
                return;
            }

        } catch (error) {
            if (error instanceof Error) {
                setServerError("Unexpected server error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content pt-24 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up</h1>
                    <p className="py-6">
                        Create an account to use LoanTracker and manage your loans efficiently.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" noValidate>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                {...register("name")}
                                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                            />
                            {errors.name &&
                                <span className="text-error text-xs mt-1">{String(errors.name.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter a valid email"
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm your password"
                                {...register("confirmPassword")}
                                className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
                            />
                            {errors.confirmPassword && <span
                                className="text-error text-xs mt-1">{String(errors.confirmPassword.message)}</span>}
                        </div>

                        <label className="label">
                            <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>

                        {serverError && <div
                            className="text-error text-sm mt-2 flex gap-2 items-center justify-center align-text-top">
                            <CircleAlert size={20}/>
                            {serverError}
                        </div>}


                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <Loader className="animate-spin"/> : "Sign Up"}
                            </button>
                        </div>

                        <label className="label py-4">
                            <p>Already have an account?</p> <p><Link href={"/auth/login"}
                                                                     className="link link-hover text-blue-700 font-semibold">Login</Link></p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}