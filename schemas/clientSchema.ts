import {z} from "zod";

export const clientSchema = z.object({
    name: z.string()
        .min(1, {message: "Please enter the client's name."})
        .min(3, {message: "Name should be at least 3 characters long."}),
    phone: z.string().min(1, {message: "Phone number is required."}).max(11, {message: "Phone number is invalid."}),
    address: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),
    serialNumber: z.string()
        .min(1, {message: "Client's serial is required."})
});

export const loanSchema = z.object({
    amount: z.string()
        .min(1, {message: "Loan amount is required."}),
    interestRate: z.string()
        .min(1, {message: "Interest rete is not added"}),
    totalPayable: z.string().optional(),
    paidAmount: z.string()
        .min(1, {message: "Paid amount is required."}),
    remainingAmount: z.string().optional(),
});

export const paymentSchema = z.object({
    amount: z.string()
        .min(0.01, {message: "Payment amount is required."}),
    date: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
});


export const clientLoanSchema = z.object({
    ...clientSchema.shape,
    ...loanSchema.shape,
});
