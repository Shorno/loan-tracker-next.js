"use client"
import {useSession} from "next-auth/react";

export default function ProfilePage() {
    const session = useSession();
    const user = session?.data?.user;
    const name = user?.name;
    const email = user?.email;
    const userId = user?.id;

    return (
        <>
            <div className={"flex justify-center items-center h-screen"}>
                <div className="card glass w-96">
                    <div className="card-body">
                        <h2 className="card-title">User Details</h2>
                        <div className={"flex"}>
                            <p className="text-sm font-semibold">Name</p>
                            <div className="badge badge-ghost">{name}</div>
                        </div>
                        <div className={"flex"}>
                            <p className="text-sm font-semibold">Email</p>
                            <div className="badge badge-ghost">{email}</div>
                        </div>
                        <div className={"flex"}>
                            <p className="text-sm font-semibold">User ID</p>
                            <div className="badge badge-ghost">{userId}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}