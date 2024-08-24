import {auth} from "@/auth";

export default async function DashboardPage() {
    const session = await auth()
    const user = session?.user
    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">{user ? "Authenticated" : "Unauthenticated"}</h2>
                    {
                        user ? (
                            <>
                                <p>Welcome, {user.id}</p>
                                <p>Email: {user.email}</p>
                            </>
                        ) : (
                            <p>Please login to access the dashboard</p>
                        )
                    }
                </div>
            </div>
        </>
    )
}