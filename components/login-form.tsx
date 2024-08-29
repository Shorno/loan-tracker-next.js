"use client"
import Link from "next/link";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema} from "@/zod-schemas/authSchema";
import {z} from "zod";
import {CircleAlertIcon, Loader} from "lucide-react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormData>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        try {
            const validatedLoginData = loginSchema.parse(data);
            const {email, password} = validatedLoginData;

            const result = await signIn("credentials", {
                redirect: false,
                email: email,
                password: password,
            });

            if (result?.code === "404") {
                setError(`${email} is not associated with any LoanTrack account`);
            } else if (result?.code === "401") {
                setError("Password is incorrect. Please check your password and try again")
            } else {
                router.push("/dashboard");
            }
        } catch (error) {
            setError("Unexpected Server Error. Please try again later");
        }
    };

    return (
        <>

            <div className="hero-content pt-10 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl lg:text-5xl font-bold">Welcome Back!</h1>
                    <p className="py-6">
                        Please login to continue using LoanTracker and manage your loans efficiently.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">

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
                                <span
                                    className="text-error text-xs mt-1">{String(errors.password.message)}</span>}
                        </div>
                        {error && (
                            <div className="alert alert-error mt-4 flex gap-0 text-start">
                                <CircleAlertIcon className="size-8 mr-2"/>
                                <span className={"text-sm"}>{error}</span>
                            </div>
                        )}

                        <div className="form-control mt-4">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <Loader className="animate-spin"/> : "Login"}
                            </button>
                        </div>
                        <label className="label py-4">
                            <p>Don&apos;t have an account?</p> <p><Link href={"/auth/signup"}
                                                                        className="link link-hover text-blue-700 font-semibold ">Sign
                            Up</Link></p>
                        </label>
                    </form>
                </div>
            </div>
        </>
    )
}

