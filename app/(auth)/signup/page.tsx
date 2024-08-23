import Link from "next/link";

export default function SignupPage(){
    return (
        <>
            <div>
                <div className="hero bg-base-200 min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Sign Up</h1>
                            <p className="py-6">
                                Create an account to use LoanTracker and manage your loans efficiently.
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
                                    <p>Already have an account?</p> <p><Link href={"/login"} className="link link-hover">Login</Link></p>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}