import { z } from "zod";

export const clientSchema = z.object({
    name: z.string()
        .min(1, { message: "Please enter the client's name." })
        .min(3, { message: "Name should be at least 3 characters long." }),
    phone: z.string()
        .nullable()
        .optional()
        .refine((val) => val === null || val === undefined || val.length === 10, {
            message: "Phone number should be 10 digits long if provided.",
        }),
    address: z.string()
        .nullable()
        .optional()
        .refine((val) => val === null || val === undefined || val.length >= 5, {
            message: "Address should be at least 5 characters long if provided.",
        }),
    serialNumber: z.string()
        .min(1, { message: "Please enter the serial number." })
});

export const loanSchema = z.object({
    amount: z.string()
        .min(1, { message: "Loan amount is required." }),
    interestRate: z.string()
        .min(1, { message: "Add the interest rate." }),
    totalPayable: z.string().optional(),
    paidAmount: z.string()
        .min(1, { message: "Paid amount is required." }),
    remainingAmount: z.string().optional(),
});

export const paymentSchema = z.object({
    amount: z.string()
        .min(0.01, { message: "Payment amount is required." }),
    date: z.coerce.date()
        .min(new Date("2000-01-01"), { message: "Date must be after year 2000" })
        .max(new Date(), { message: "Date cannot be in the future" }),
});