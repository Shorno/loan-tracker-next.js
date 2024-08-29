import {z} from "zod";

export const clientSchema = z.object({
    clientName: z.string()
        .min(1, {message: "Please enter the client's name."})
        .min(3, {message: "Name should be at least 3 characters long."}),
    clientPhone: z.string()
        .min(1, {message: "Phone number is required."})
        .regex(/^\d{11}$/, {message: "Phone number must be 11 digits."}),
    clientAddress: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),
    clientSerialNumber: z.coerce.number({message: "Serial number must be a number."})
        .int({message: "Serial number cannot be fraction."})
        .min(1, {message: "Serial number is required."}),
    guarantorName: z.string()
        .min(1, {message: "Please enter the loan guarantor's name."}),
    guarantorPhone: z.string()
        .min(1, {message: "Phone number is required."})
        .regex(/^\d{11}$/, {message: "Phone number must be 11 digits."}),
    guarantorAddress: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),

});

export const loanSchema = z.object({
    loanAmount: z.coerce.number({message: "Loan amount must be a number."})
        .int({message: "Loan amount cannot be fraction."})
        .min(1, {message: "Loan amount is required."}),
    totalAmountPayable: z.coerce.number().int().optional(),
    totalPaidAmount: z.coerce.number({message: "Paid amount must be a number."})
        .int({message: "Paid amount cannot be fraction."})
        .min(0, {message: "Paid amount is required."}),
    loanInterestRate: z.coerce.number().int().optional().default(20),
    remainingAmountPayable: z.coerce.number().int().optional(),
    netAmountPayable: z.coerce.number().int().optional(),
    initialSavingsAmount: z.coerce.number().int().optional().default(10),
    totalSavingsAmount: z.coerce.number().int().optional(),
    startDate: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
    duration: z.coerce.number().int().optional().default(120)
});

export const paymentSchema = z.object({
    paymentAmount: z.coerce.number({message: "Payment amount must be a number."}).int({message: "Payment amount cannot be fraction."})
        .min(1, {message: "Payment amount is required."}),
    savingsAmount: z.coerce.number({message: "Savings amount must be a number."}).int({message: "Savings amount cannot be fraction."}).min(1, {message: "Savings amount is required."}),
    paymentDate: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
});


export const clientLoanSchema = z.object({
    ...clientSchema.shape,
    ...loanSchema.shape,
});
