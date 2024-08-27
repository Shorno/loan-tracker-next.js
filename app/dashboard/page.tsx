import {getAllUsers} from "@/actions/user";

export default async function DashboardPage() {
    const users = await getAllUsers();

    return (
        <>
            <div className="overflow-x-auto pt-24 container mx-auto">
                <table className="table table-zebra table-pin-cols ">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>User Id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.id}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}