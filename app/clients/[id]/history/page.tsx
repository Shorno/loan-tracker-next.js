import {getClientPaymentHistoryById} from "@/actions/clients";

export default async function PaymentHistoryPage({params}: { params: { id: string } }) {

    const id = params.id;

    const {data: payments} = await getClientPaymentHistoryById(id);
    // console.log(payments);


    return (
        <>
            <div className={"h-screen pt-24 container mx-auto"}>
                <div className={"flex justify-between px-4 md:px-0 pb-8"}>
                    <h1 className={"text-2xl font-extrabold"}>Payment History</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra  table-pin-cols table-pin-row table-sm ">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Savings</th>
                        </tr>
                        </thead>
                        <tbody>
                        {payments && payments?.map(payment => (
                            <tr key={payment.id}>
                                <td className={""}>{payment.paymentDate.toLocaleDateString()}</td>
                                <td className={""}>{payment.paymentAmount}৳</td>
                                <td className={""}>{payment.savingsAmount}৳</td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}