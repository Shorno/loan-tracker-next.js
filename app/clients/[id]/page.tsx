import {getClientById} from "@/actions/clients";
import {MapPin} from "lucide-react";
import Link from "next/link";
import DynamicProgressbar from "@/components/dynamic-progressbar";

export default async function ClientDetails({params}: { params: { id: string } }) {
    const id = params.id;
    const response = await getClientById(id);
    const client = response.data;
    const loan = client?.loan;
    const loanStartDate = loan?.startDate.toLocaleDateString();
    const loanDuration = loan?.duration;


    return (
        <div className={"container mx-auto pt-20"}>
            <div className="card bg-indigo-100 w-[22rem] mx-auto items-center">
                <div className="avatar placeholder justify-center pt-4">
                    <div className="bg-neutral text-neutral-content w-14 rounded-full">
                        <span className="text-3xl">{client?.clientName[0]}</span>
                    </div>
                </div>
                <div className="card-body justify-center items-center -mt-4">
                    <h2 className="card-title text-2xl">{client?.clientName} <span>#{client?.clientSerialNumber}</span>
                    </h2>
                    <p className={"badge badge-neutral badge-lg mt-2"}>{client?.clientPhone}</p>
                    <div className={"flex gap-2 py-2"}>
                        <MapPin/>
                        <p>{client?.clientAddress}</p>
                    </div>
                </div>
                <div className="divider -mt-4">
                    <span className={"text-zinc-600"}>Loan Guranter</span>
                </div>
                <div className={"flex pb-8 py-4"}>
                    <div className={"flex justify-center gap-4 items-center max-w-80"}>
                        <div className={"flex justify-between items-center"}>
                            <p className={"badge rounded-md"}>{client?.guarantorName}</p>
                        </div>
                        <div className={"flex justify-center text-base-content items-center"}>
                            <p className={"badge rounded-md"}>{client?.guarantorPhone}</p>
                        </div>
                        <div className={"flex justify-center items-center"}>
                            <p className={"badge rounded-md"}>{client?.guarantorAddress}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"border-b border-gray-200 mt-4"}>
                <DynamicProgressbar startDate={loanStartDate} duration={loanDuration} label={loanDuration}/>
            </div>


            <div className={"grid pt-8 grid-cols-2 gap-1 px-4"}>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Loan Amount</div>
                        <div className="stat-value text-[1.7rem] overflow-hidden">{loan?.loanAmount}৳</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">With Interest</div>
                        <div className="stat-value text-[1.7rem] overflow-hidden">{loan?.totalAmountPayable}৳</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Paid</div>
                        <div className="stat-value text-[1.7rem] overflow-hidden text-teal-600">{loan?.totalPaidAmount}৳
                        </div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Due Payment</div>
                        <div
                            className="stat-value text-[1.7rem] overflow-hidden text-red-500">{loan?.remainingAmountPayable}৳
                        </div>
                    </div>
                </div>

                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Net Payable</div>
                        <div className="stat-value text-[1.7rem] overflow-hidden">{loan?.netAmountPayable}৳</div>
                    </div>
                </div>
                <div className="stats shadow">
                    <div className="stat">
                        <div className="stat-title">Total Savings</div>
                        <div className="stat-value  text-[1.7rem] overflow-hidden">{loan?.totalSavingsAmount}৳</div>
                    </div>
                </div>

            </div>

            <div className={"container mx-auto flex items-center justify-center"}>
                <Link href={`/clients/${id}/history`}
                      className={"btn btn-neutral mt-8 w-80 btn-sm rounded-md mb-4 mx-auto"}>
                    View Payment History
                </Link>
            </div>
        </div>
    )
}