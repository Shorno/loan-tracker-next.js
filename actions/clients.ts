"use server"
import prisma from "@/prisma/db";
import {clientLoanSchema, paymentSchema} from "@/zod-schemas/clientSchema";
import {auth} from "@/auth";


export const createClientLoanAction = async (data: any) => {
    try {
        const validatedClientLoanData = clientLoanSchema.parse(data);

        const {
            name,
            phone,
            address,
            serialNumber,
            amount,
            interestRate,
            paidAmount,
            loanGuarantorName,
            loanGuarantorPhone,
            loanGuarantorAddress
        } = validatedClientLoanData;

        // Get the current user's session
        const session = await auth();
        const currentUserId = session?.user?.id;
        if (!session || !session.user || !session.user.id) {
            return {error: "You must be logged in to create a client and loan."};
        }

        // Check if client with this serial number already exists
        const existingClient = await prisma.client.findUnique({
            where: {serialNumber}
        });

        if (existingClient) {
            return {error: `Client with serial number ${serialNumber} already exists.`}
        }

        if (!currentUserId) {
            return {error: "Current user ID is undefined."};
        }

        // Create client and loan in a single transaction
        const result = await prisma.$transaction(async (prisma) => {
            const client = await prisma.client.create({
                data: {
                    name,
                    phone,
                    address,
                    serialNumber,
                    loanGuarantorName,
                    loanGuarantorAddress,
                    loanGuarantorPhone,
                    createdById: currentUserId,
                }
            });


            const totalPayable = Math.round(amount * (1 + interestRate / 100));
            const remainingAmount = totalPayable - paidAmount;

            const loan = await prisma.loan.create({
                data: {
                    clientId: client.id,
                    amount,
                    interestRate,
                    paidAmount,
                    totalPayable,
                    remainingAmount,
                }
            });

            return {client, loan};
        });

        console.log("Client and loan created successfully");
        return {success: true, data: result};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message}
        }
        return {error: "Unexpected server error occurred. Please try again"};
    }
}


export const getAllClients = async () => {
    try {
        const clients = await prisma.client.findMany({
            include: {
                loan: true
            }
        });

        return {success: true, data: clients};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message}
        }
        return {error: "Unexpected server error occurred. Please try again"};
    }
}

export const getClientById = async (id: string) => {
    try {
        const client = await prisma.client.findUnique({
            where: {id},
            include: {loan: true}
        });

        if (!client) {
            return {error: "Client not found"};
        }

        return {success: true, data: client};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message};
        }
        return {error: "Unexpected server error occurred. Please try again"};
    }
};


// export const addPaymentAction = async (loanId: string, data: any) => {
//     try {
//         const validatedPaymentData = paymentSchema.parse(data);
//
//         const {amount, savings, date} = validatedPaymentData;
//
//         // Get the current user's session
//         const session = await auth();
//         const currentUserId = session?.user?.id;
//         if (!session || !session.user || !session.user.id) {
//             return {error: "You must be logged in to add a payment."};
//         }
//
//         if (!currentUserId) {
//             return {error: "Current user ID is undefined."};
//         }
//
//         // Check if loan exists
//         const existingLoan = await prisma.loan.findUnique({
//             where: {id: loanId}
//         });
//
//         if (!existingLoan) {
//             return {error: `Loan with ID ${loanId} does not exist.`}
//         }
//
//         // Create payment
//         const result = await prisma.payment.create({
//             data: {
//                 amount,
//                 savings,
//                 date,
//                 loanId,
//             }
//         });
//
//         console.log("Payment added successfully");
//         return {success: true, data: result};
//     } catch (error) {
//         if (error instanceof Error) {
//             return {error: error.message}
//         }
//         return {error: "Unexpected server error occurred. Please try again"};
//     }
// }


export const addPaymentAction = async (loanId: string, data: any) => {
    try {
        const validatedPaymentData = paymentSchema.parse(data);

        const {amount, savings, date} = validatedPaymentData;

        const session = await auth();
        const currentUserId = session?.user?.id;
        if (!session || !session.user || !session.user.id) {
            return {error: "You must be logged in to add a payment."};
        }

        if (!currentUserId) {
            return {error: "Current user ID is undefined."};
        }

        const existingLoan = await prisma.loan.findUnique({
            where: {id: loanId}
        });

        if (!existingLoan) {
            return {error: `Loan with ID ${loanId} does not exist.`}
        }

        const result = await prisma.$transaction(async (prisma) => {
            const payment = await prisma.payment.create({
                data: {
                    amount,
                    savings,
                    date,
                    loanId,
                }
            });

            const updatedLoan = await prisma.loan.update({
                where: {id: loanId},
                data: {
                    paidAmount: {increment: amount},
                    remainingAmount: {decrement: amount},
                    totalSavings: {increment: savings},
                    netPayable: {
                        decrement: amount + savings
                    }
                }
            });

            return {payment, updatedLoan};
        });

        console.log("Payment added successfully");
        return {success: true, data: result};
    } catch (error) {
        if (error instanceof Error) {
            return {error: error.message}
        }
        return {error: "Unexpected server error occurred. Please try again"};
    }
}