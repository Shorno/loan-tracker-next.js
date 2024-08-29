import {z} from "zod";

export const clientSchema = z.object({
    name: z.string()
        .min(1, {message: "Please enter the client's name."})
        .min(3, {message: "Name should be at least 3 characters long."}),
    phone: z.string()
        .min(1, {message: "Phone number is required."})
        .regex(/^\d{11}$/, {message: "Phone number must be 11 digits."}),
    address: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),
    serialNumber: z.coerce.number({message: "Serial number must be a number."})
        .int({message: "Serial number cannot be fraction."})
        .min(1, {message: "Serial number is required."}),
    loanGuarantorName: z.string()
        .min(1, {message: "Please enter the loan guarantor's name."}),
    loanGuarantorPhone: z.string()
        .min(1, {message: "Phone number is required."})
        .regex(/^\d{11}$/, {message: "Phone number must be 11 digits."}),
    loanGuarantorAddress: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),

});

export const loanSchema = z.object({
    amount: z.coerce.number({message: "Loan amount must be a number."})
        .int({message: "Loan amount cannot be fraction."})
        .min(1, {message: "Loan amount is required."}),
    interestRate: z.coerce.number({message: "Interest rate must be a number."})
        .int({message: "Interest rate cannot be fraction."})
        .min(1, {message: "Interest rete is not added"}),
    totalPayable: z.coerce.number().int().optional(),
    paidAmount: z.coerce.number({message: "Paid amount must be a number."})
        .int({message: "Paid amount cannot be fraction."})
        .min(1, {message: "Paid amount is required."}),
    remainingAmount: z.coerce.number().int().optional(),
    netPayable: z.coerce.number().int().optional(),
    totalSavings: z.coerce.number().int().optional(),
});

export const paymentSchema = z.object({
    amount: z.coerce.number({message: "Payment amount must be a number."}).int({message: "Payment amount cannot be fraction."})
        .min(1, {message: "Payment amount is required."}),
    savings: z.coerce.number({message: "Savings amount must be a number."}).int({message: "Savings amount cannot be fraction."}).min(1, {message: "Savings amount is required."}),
    date: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
});


export const clientLoanSchema = z.object({
    ...clientSchema.shape,
    ...loanSchema.shape,
});
