import {z} from "zod";

export const clientSchema = z.object({
    name: z.string()
        .min(1, {message: "Please enter the client's name."})
        .min(3, {message: "Name should be at least 3 characters long."}),
    phone: z.string().min(1, {message: "Phone number is required."}).max(11, {message: "Phone number is invalid."}),
    address: z.string()
        .min(1, {message: "Please enter the client's address."})
        .min(3, {message: "Address should be at least 3 characters long."}),
    serialNumber: z.number().int().min(1, {message: "Serial number is required."}),
    loanGuarantorPhone: z.string()
        .min(1, {message: "Guarantor's phone number is required."})
        .max(11, {message: "Guarantor's phone number is invalid."}).optional(),
    loanGuarantorName: z.string()
        .min(1, {message: "Guarantor's name is required."}).optional(),
    loanGuarantorAddress: z.string()
        .min(1, {message: "Guarantor's address is required."}).optional()
});

export const loanSchema = z.object({
    amount: z.number().int()
        .min(1, {message: "Loan amount is required."}),
    interestRate: z.number().int()
        .min(1, {message: "Interest rete is not added"}),
    totalPayable: z.number().int().optional(),
    paidAmount: z.number().int()
        .min(1, {message: "Paid amount is required."}),
    remainingAmount: z.number().int().optional(),
    totalSavings: z.number().int().optional(),
    startDate: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
});

export const paymentSchema = z.object({
    amount: z.number().int()
        .min(1, {message: "Payment amount is required."}),
    date: z.coerce.date()
        .min(new Date("2000-01-01"), {message: "Date must be after year 2000"})
        .max(new Date(), {message: "Date cannot be in the future"}),
    savings: z.number().int().min(1, {message: "Savings amount is required."}),
});


export const clientLoanSchema = z.object({
    ...clientSchema.shape,
    ...loanSchema.shape,
});
