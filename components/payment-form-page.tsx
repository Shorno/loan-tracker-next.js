'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {Loader } from "lucide-react";
import { paymentSchema } from "@/zod-schemas/clientSchema";

type PaymentFormData = z.infer<typeof paymentSchema>;

export default function PaymentFormTestPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<PaymentFormData>({
        mode: "all",
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            amount: 0,
            savings: 0,
        }
    });

    const onSubmit = async (data: PaymentFormData) => {
        try {
            // Log the form data to the console
            console.log('Submitting payment. Amount:', data.amount, 'Savings:', data.savings);
            console.log('Full form data:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Reset form data
            reset();

            alert('Form submitted successfully! Check the console for logged data.');
        } catch (error) {
            console.error("Error submitting form:", error);
            alert('An error occurred while submitting the form. Please check the console for details.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment Form Test</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Payment Amount</span>
                    </label>
                    <input
                        type="number"
                        inputMode="numeric"
                        {...register("amount")}
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
                        {...register("savings", { valueAsNumber: true })}
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
                        type="date"
                        {...register("date")}
                        className={`input input-bordered w-full ${errors.date ? 'input-error' : ''}`}
                    />
                    {errors.date && (
                        <span className="text-error text-xs mt-1">{String(errors.date.message)}</span>
                    )}
                </div>
                <div className="form-control mt-6">
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? <Loader className="animate-spin"/> : "Submit Payment"}
                    </button>
                </div>
            </form>
        </div>
    );
}