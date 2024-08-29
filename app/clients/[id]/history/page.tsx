import {getClientPaymentHistoryById} from "@/actions/clients";

export default async function PaymentHistoryPage({params}: { params: { id: string } }) {

    const id = params.id;

    const {data: payments} = await getClientPaymentHistoryById(id);
    console.log(payments);


    return (
        <>
            <div className={"pt-24"}>
                <h1>Payment History</h1>
                {
                    payments && payments?.map(payment => (
                        <div key={payment.id}>
                            <p>Amount: {payment.paymentAmount}</p>
                            <p>Date: {payment.createdAt.toDateString()}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}