"use client"
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CircleAlert, Loader} from "lucide-react";
import {clientLoanSchema} from "@/zod-schemas/clientSchema"; // You'll need to create this
import {createClientLoanAction} from "@/actions/clients";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

type ClientLoanFormData = z.infer<typeof clientLoanSchema>;

export default function ClientLoanCreationForm() {
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ClientLoanFormData>({
        mode: "all",
        resolver: zodResolver(clientLoanSchema),
        defaultValues: {
            clientName: "",
            clientPhone: "",
            clientAddress: "",
            clientSerialNumber: 0,
            guarantorName: "",
            guarantorPhone: "",
            guarantorAddress: "",
            loanAmount: 0,
            loanInterestRate: 0,
            totalPaidAmount: 0,
            netAmountPayable: 0,
        }
    });

    const onSubmit = async (data: ClientLoanFormData) => {
        // setServerError("");
        try {
            const response = await createClientLoanAction(data);

            if (response?.error) {
                setServerError(response.error);
                return;
            }else if(response?.success){
                toast.success("New member created successfully.");
                router.push("/clients");
            }
        } catch (error) {
            if (error instanceof Error) {
                setServerError("Unexpected server error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content pt-24 flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Create Client & Loan</h1>
                    <p className="py-6">
                        Add a new client and their loan details to the LoanTracker system.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body" noValidate>
                        {/* Client Details */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter client's name"
                                {...register("clientName")}
                                className={`input input-bordered ${errors.clientName ? 'input-error' : ''}`}
                            />
                            {errors.clientName &&
                                <span className="text-error text-xs mt-1">{String(errors.clientName.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type={"text"}
                                inputMode={"numeric"}
                                placeholder="Enter phone number"
                                {...register("clientPhone")}
                                className={`input input-bordered ${errors.clientPhone ? 'input-error' : ''}`}
                            />
                            {errors.clientPhone &&
                                <span className="text-error text-xs mt-1">{String(errors.clientPhone.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                {...register("clientAddress")}
                                className={`input input-bordered ${errors.clientAddress ? 'input-error' : ''}`}
                            />
                            {errors.clientAddress &&
                                <span className="text-error text-xs mt-1">{String(errors.clientAddress.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Serial Number</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter serial number"
                                {...register("clientSerialNumber")}
                                className={`input input-bordered ${errors.clientSerialNumber ? 'input-error' : ''}`}
                            />
                            {errors.clientSerialNumber &&
                                <span className="text-error text-xs mt-1">{String(errors.clientSerialNumber.message)}</span>}
                        </div>

                        {/* Loan Details */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Loan Amount</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter loan amount"
                                {...register("loanAmount")}
                                className={`input input-bordered ${errors.loanAmount ? 'input-error' : ''}`}
                            />
                            {errors.loanAmount &&
                                <span className="text-error text-xs mt-1">{String(errors.loanAmount.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Interest Rate</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter interest rate"
                                {...register("loanInterestRate")}
                                className={`input input-bordered ${errors.loanInterestRate ? 'input-error' : ''}`}
                            />
                            {errors.loanInterestRate &&
                                <span className="text-error text-xs mt-1">{String(errors.loanInterestRate.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Paid Amount</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter paid amount"
                                {...register("totalPaidAmount")}
                                className={`input input-bordered ${errors.totalPaidAmount ? 'input-error' : ''}`}
                            />
                            {errors.totalPaidAmount &&
                                <span className="text-error text-xs mt-1">{String(errors.totalPaidAmount.message)}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Guarantor Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter guarantor's name"
                                {...register("guarantorName")}
                                className={`input input-bordered ${errors.guarantorName ? 'input-error' : ''}`}
                            />
                            {errors.guarantorName &&
                                <span
                                    className="text-error text-xs mt-1">{String(errors.guarantorName.message)}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Guarantor Phone</span>
                            </label>
                            <input
                                type="text"
                                inputMode={"numeric"}
                                placeholder="Enter guarantor's phone number"
                                {...register("guarantorPhone")}
                                className={`input input-bordered ${errors.guarantorPhone ? 'input-error' : ''}`}
                            />
                            {errors.guarantorPhone &&
                                <span
                                    className="text-error text-xs mt-1">{String(errors.guarantorPhone.message)}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Guarantor Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter guarantor's address"
                                {...register("guarantorAddress")}
                                className={`input input-bordered ${errors.guarantorAddress ? 'input-error' : ''}`}
                            />
                            {errors.guarantorAddress &&
                                <span
                                    className="text-error text-xs mt-1">{String(errors.guarantorAddress.message)}</span>}
                        </div>

                        {serverError && (
                            <div
                                className="text-error text-sm mt-2 flex gap-2 items-center justify-center align-text-top">
                                <CircleAlert size={20}/>
                                {serverError}
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <Loader className="animate-spin"/> : "Create Client & Loan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}