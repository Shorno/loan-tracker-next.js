import {getAllClients} from "@/actions/clients";
import Link from "next/link";
import {PlusCircle} from "lucide-react";
import PaymentModal from "@/components/payment-modal";

export default async function ClientsPage() {
    const {data} = await getAllClients();
    const clients = data;

    return (
        <div className={"h-screen pt-24 container mx-auto"}>
            <div className={"flex justify-between px-4 pb-8"}>
                <h1 className={"text-2xl font-extrabold"}>Members List</h1>
                <Link href={"/clients/new"} className={"btn btn-neutral btn-sm rounded-md"}>
                    <PlusCircle size={15}/>
                    <p>Add member</p>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra  table-pin-cols table-pin-row table-sm ">
                    <thead>
                    <tr>
                        <th>Member Name</th>
                        <th>Due Amount</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients && clients.map(client => (
                        <tr key={client.id}>
                            {client.loan && (
                                <th>
                                    <Link href={`/clients/${client.id}`} className={"text-blue-700"}>
                                        {client.clientName} #{client.clientSerialNumber}
                                    </Link>
                                </th>
                            )}

                            <td className={"badge badge-warning badge-xs mt-4"}>BDT {client.loan?.remainingAmountPayable}</td>
                            <td>
                                {client.loan && (
                                    <PaymentModal
                                        remainingAmount={client.loan.remainingAmountPayable}
                                        clientName={client.clientName}
                                        loanId={client.loan.id}
                                    />
                                )}
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}