import {getAllClients} from "@/actions/clients";
import Link from "next/link";
import {PlusCircle} from "lucide-react";

export default async function ClientsPage() {
    const {data} = await getAllClients();
    const clients = data;


    return (
        <div className={"h-screen pt-24 container mx-auto"}>
            <div className={"flex justify-end pr-4 pb-8"}>
                <Link href={"/clients/new"} className={"btn btn-neutral btn-xs rounded-md"}>
                      <PlusCircle size={15}/>
                      <p>Add member</p>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra  table-pin-cols table-pin-rows ">
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