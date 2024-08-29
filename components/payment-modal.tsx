'use client'

import {useState} from 'react'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {CircleAlertIcon, Loader} from "lucide-react";
import {paymentSchema} from "@/zod-schemas/clientSchema";
import {addPaymentAction} from "@/actions/clients";

type PaymentFormData = z.infer<typeof paymentSchema>;

type PaymentModalProps = {
    loanId: string;
    clientName: string;
    remainingAmount: number | null | undefined;
};

export default function PaymentModal({loanId, clientName, remainingAmount}: PaymentModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<PaymentFormData>({
        mode: "all",
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: 0,
            savings: 0,
        }
    });

    const onSubmit = async (data: PaymentFormData) => {

        console.log('Form data before submit:', data);

        try {
            // Simulate API call
            const response = await addPaymentAction(loanId, data);
            if (response.error) {
                setError(response.error);
            } else {
                console.log('Payment added successfully:', response.data);

                // Reset form data
                reset();
                console.log('Form reset complete');

                // Close the modal after submission
                setIsOpen(false);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Unexpected Server Error. Please try again later");
        }
    };


    return (
        <>
            <button className="btn btn-xs btn-neutral" onClick={() => setIsOpen(true)}>Payment</button>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Loan Payment for {clientName}</h3>
                        <p className="py-4">Due Amount: BDT {remainingAmount}</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Payment Amount</span>
                                </label>
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    {...register("amount", {valueAsNumber: true})}
                                    className={`input input-bordered w-full ${errors.amount ? 'input-error' : ''}`}
                                />
                                {errors.amount && (
                                    <span className="text-error text-xs mt-1">{String(errors.amount.message)}</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Savings</span>
                                </label>
                                <input
                                    type="number"
                                    inputMode="numeric"
                                    {...register("savings", {valueAsNumber: true})}
                                    className={`input input-bordered w-full ${errors.savings ? 'input-error' : ''}`}
                                />
                                {errors.savings && (
                                    <span className="text-error text-xs mt-1">{String(errors.savings.message)}</span>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    {...register("date")}
                                    className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                                />
                                {errors.date && (
                                    <span className="text-error text-xs mt-1">{String(errors.date.message)}</span>
                                )}
                            </div>
                            {error && (
                                <div className="alert alert-error mt-4 flex gap-0 text-start">
                                    <CircleAlertIcon className="size-8 mr-2"/>
                                    <span className="text-sm">{error}</span>
                                </div>
                            )}
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader className="animate-spin"/> : "Submit Payment"}
                                </button>
                                <button type="button" className="btn" onClick={() => setIsOpen(false)}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}