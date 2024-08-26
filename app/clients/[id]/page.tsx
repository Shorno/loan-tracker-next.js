import {getClientById} from "@/actions/clients";

export default async function ClientDetails({params}: { params: { id: string } }) {
    const id = params.id;
    const response = await getClientById(id);
    const client = response.data;
    const loan = client?.loan;


    return (
        <div>
            <h1>Clients Details</h1>
            {
                client && (
                    <div>
                        <p>Name: {client.name}</p>
                        <p>Phone: {client.phone}</p>
                        <p>Address: {client.address}</p>
                        <p>Serial Number: {client.serialNumber}</p>
                        {loan && (
                            <>
                                <p>Loan Amount: ${loan.amount}</p>
                                <p>Interest Rate: {loan.interestRate}%</p>
                                <p>Total Payable: ${loan.totalPayable}</p>
                                <p>Amount Paid: ${loan.paidAmount}</p>
                                <p>Remaining Payment: ${loan.remainingAmount}</p>
                            </>
                        )}
                    </div>
                )
            }
        </div>
    )
}