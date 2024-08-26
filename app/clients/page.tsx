import {getAllClients} from "@/actions/clients";
import Link from "next/link";

export default async function ClientsPage() {
    const {data} = await getAllClients();
    const clients = data;


    return (
        <div className={"h-screen pt-24 container mx-auto"}>
            <div className="overflow-x-auto">
                <table className="table table-zebra  table-pin-cols table-pin-rows">
                    <thead>
                    <tr>
                        <th>Member Name</th>
                        <th>Due Amount</th>
                        <th>Info</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        clients && clients.map(client => (
                            <tr key={client.id}>
                                <th>{client.name} #{client.serialNumber} </th>
                                <td className={"badge badge-warning badge-xs mt-3"}>BDT {client.loan?.remainingAmount}</td>

                                {client.loan && (
                                    <>
                                        <td>
                                            <Link href={`/clients/${client.id}`} className={"text-blue-700"}>
                                                View Details
                                            </Link>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}