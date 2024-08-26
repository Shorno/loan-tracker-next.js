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
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Serial Number</th>
                        <th>Loan Amount</th>
                        <th>Interest Rate</th>
                        <th>Total Payable</th>
                        <th>Amount Paid</th>
                        <th>Remaining Payment</th>
                        <th>Client Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        clients && clients.map(client => (
                            <tr key={client.id}>
                                <th>{client.name}</th>
                                <td>{client.phone}</td>
                                <td>{client.address}</td>
                                <td>{client.serialNumber}</td>
                                {client.loan && (
                                    <>
                                        <td>${client.loan.amount}</td>
                                        <td>{client.loan.interestRate}%</td>
                                        <td>${client.loan.totalPayable}</td>
                                        <td>${client.loan.paidAmount}</td>
                                        <td>${client.loan.remainingAmount}</td>
                                        <td>
                                            <Link href={`/clients/${client.id}`}>
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