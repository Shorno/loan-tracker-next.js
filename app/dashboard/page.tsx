import {getAllClients, getTotalLoanAmount} from "@/actions/clients";
import Link from "next/link";
import {CircleArrowRight, PlusCircle} from "lucide-react";

export default async function DashboardPage() {
    const {data} = await getAllClients();
    const totalClients = data?.length;
    const totalLoanAmount = await getTotalLoanAmount()

    return (
        <>
            <div className="pt-24 overflow-x-auto container flex flex-col justify-between pb-20  h-svh mx-auto">
                <div className="flex flex-col">
                    <Link href={"/clients"} className="stat border border-gray-200 flex justify-between items-center">
                        <div>
                            <div className="stat-title">Total Members</div>
                            <div className="stat-value text-primary">{totalClients}</div>
                        </div>
                        <div className={""}>
                            <CircleArrowRight size={30}/>
                        </div>
                    </Link>
                    <div className="stat">
                        <div className="stat-title">Total Loan Amount</div>
                        <div className="stat-value">{totalLoanAmount} BDT</div>
                    </div>

                   <Link href={"/clients/new"} className="mt-8 btn-sm rounded-md mb-4 mx-auto w-fit">
                       <span></span>
                       <PlusCircle size={40} className={"mr-2"}/>
                   </Link>
                </div>

                <div className={"container mx-auto flex items-center justify-center"}>
                    <Link href={`/history`}
                          className={"btn btn-neutral mt-8 w-80 btn-sm rounded-md mb-4 mx-auto"}>
                        View Payment History
                    </Link>
                </div>
            </div>


        </>
    )
}