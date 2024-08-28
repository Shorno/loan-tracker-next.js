"use client"
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CircleAlert, Loader} from "lucide-react";
import {clientLoanSchema} from "@/schemas/clientSchema"; // You'll need to create this
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
            name: "",
            phone: "",
            address: "",
            serialNumber: 0,
            amount: 0,
            interestRate: 0,
            paidAmount: 0,
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
                                {...register("name")}
                                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                            />
                            {errors.name &&
                                <span className="text-error text-xs mt-1">{String(errors.name.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input
                                type={"text"}
                                inputMode={"numeric"}
                                placeholder="Enter phone number"
                                {...register("phone")}
                                className={`input input-bordered ${errors.phone ? 'input-error' : ''}`}
                            />
                            {errors.phone &&
                                <span className="text-error text-xs mt-1">{String(errors.phone.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter address"
                                {...register("address")}
                                className={`input input-bordered ${errors.address ? 'input-error' : ''}`}
                            />
                            {errors.address &&
                                <span className="text-error text-xs mt-1">{String(errors.address.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Serial Number</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter serial number"
                                {...register("serialNumber")}
                                className={`input input-bordered ${errors.serialNumber ? 'input-error' : ''}`}
                            />
                            {errors.serialNumber &&
                                <span className="text-error text-xs mt-1">{String(errors.serialNumber.message)}</span>}
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
                                {...register("amount")}
                                className={`input input-bordered ${errors.amount ? 'input-error' : ''}`}
                            />
                            {errors.amount &&
                                <span className="text-error text-xs mt-1">{String(errors.amount.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Interest Rate</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter interest rate"
                                {...register("interestRate")}
                                className={`input input-bordered ${errors.interestRate ? 'input-error' : ''}`}
                            />
                            {errors.interestRate &&
                                <span className="text-error text-xs mt-1">{String(errors.interestRate.message)}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Paid Amount</span>
                            </label>
                            <input
                                type="number"
                                inputMode={"numeric"}
                                placeholder="Enter paid amount"
                                {...register("paidAmount")}
                                className={`input input-bordered ${errors.paidAmount ? 'input-error' : ''}`}
                            />
                            {errors.paidAmount &&
                                <span className="text-error text-xs mt-1">{String(errors.paidAmount.message)}</span>}
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