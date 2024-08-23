import Link from "next/link";

export default function LoginPage(){
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
                            <form className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required/>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered"
                                           required/>
                                    <label className="label">
                                        <Link href="#" className="label-text-alt link link-hover">Forgot
                                            password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                                <label className="label py-4">
                                    <p>Don&apos;t have an account?</p> <p><Link href={"/signup"} className="link link-hover">Signup</Link></p>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}