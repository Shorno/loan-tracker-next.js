import {getAllClients, getTotalLoanAmount} from "@/actions/clients";

export default async function DashboardPage() {
    const {data} = await getAllClients();
    const totalClients = data?.length;
    const totalLoanAmount =  await getTotalLoanAmount()



    return (
        <>
            <div className="pt-24 overflow-x-auto container mx-auto">
                <div className="stats shadow flex flex-col">
                    <div className="stat">
                        <div className="stat-title">Total Members</div>
                        <div className="stat-value text-primary">{totalClients}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Total Loan Given</div>
                        <div className="stat-value text-secondary">{totalLoanAmount}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>

        </>
    )
}