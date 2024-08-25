import {getAllUsers} from "@/actions/user";

export default async function DashboardPage() {
    const users = await getAllUsers();
    console.log(users);

    return (
        <>
            <div className="overflow-x-auto pt-24">
                <table className="table table-zebra table-pin-cols ">
                    {/* head */}
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