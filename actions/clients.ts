"use server"
import prisma from "@/prisma/db";
import {clientLoanSchema, paymentSchema} from "@/zod-schemas/clientSchema";
import {auth} from "@/auth";


export const createClientLoanAction = async (data: any) => {
    try {
        const validatedClientLoanData = clientLoanSchema.parse(data);

        const {
            clientName,
            clientPhone,
            clientAddress,
            clientSerialNumber,
            guarantorName,
            guarantorPhone,
            guarantorAddress,
            loanAmount,
            initialSavingsAmount,
            loanInterestRate,
            totalPaidAmount,
        } = validatedClientLoanData;

        // Get the current user's session
        const session = await auth();
        const currentUserId = session?.user?.id;
        if (!session || !session.user || !session.user.id) {
            return {error: "You must be logged in to create a client and loan."};
        }

        // Check if client with this serial number already exists
        const existingClient = await prisma.client.findUnique({
            where: {clientSerialNumber}
        });

        if (existingClient) {
            return {error: `Client with serial number ${clientSerialNumber} already exists.`}
        }

        if (!currentUserId) {
            return {error: "Current user ID is undefined."};
        }

        const interestRate = loanInterestRate / 100;
        const totalAmountPayable = Math.round(loanAmount * (1 + interestRate));
        const calculatedInitialSavings = Math.round(loanAmount * (initialSavingsAmount / 100));
        const netAmountPayable = totalAmountPayable - calculatedInitialSavings;


        // Create client and loan in a single transaction
        const result = await prisma.$transaction(async (prisma) => {
            const client = await prisma.client.create({
                data: {
                    clientName,
                    clientPhone,
                    clientAddress,
                    clientSerialNumber,
                    guarantorName,
                    guarantorAddress,
                    guarantorPhone,
                    createdById: currentUserId,
                }
            });


            const totalAmountPayable = Math.round(loanAmount * (1 + loanInterestRate / 100));
            const remainingAmountPayable = totalAmountPayable - totalPaidAmount;

            const loan = await prisma.loan.create({
                data: {
                    clientId: client.id,
                    loanAmount,
                    loanInterestRate,
                    totalPaidAmount,
                    initialSavingsAmount,
                    totalAmountPayable,
                    remainingAmountPayable: netAmountPayable,
                    netAmountPayable,
                    totalSavingsAmount: calculatedInitialSavings,
                    startDate: new Date(),

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


export const addPaymentAction = async (loanId: string, data: any) => {
    try {
        const validatedPaymentData = paymentSchema.parse(data);

        const {paymentAmount, savingsAmount, paymentDate} = validatedPaymentData;

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
                    paymentAmount,
                    savingsAmount,
                    paymentDate,
                    loanId,
                }
            });


            const newTotalSavings = (existingLoan.totalSavingsAmount || 0) + savingsAmount;
            const newRemainingAmountPayable = (existingLoan.remainingAmountPayable || 0) - paymentAmount;
            const newNetPayable = Math.max(newRemainingAmountPayable - newTotalSavings, 0);


            const updatedLoan = await prisma.loan.update({
                where: {id: loanId},
                data: {
                    totalPaidAmount: {increment: paymentAmount},
                    remainingAmountPayable: {decrement: paymentAmount},
                    totalSavingsAmount: newTotalSavings,
                    netAmountPayable: newNetPayable
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

export const getTotalLoanAmount = async () => {
    const result = await prisma.loan.aggregate({
        _sum: {
            loanAmount: true
        }
    });
    return result._sum.loanAmount || 0;
}

// export const getClientLoanHistory = async (id: string) => {
//     try {
//         const client = await prisma.client.findUnique({
//             where: {id},
//             include: {
//                 loan: {
//                     include: {
//                         payments: true
//                     }
//                 }
//             }
//         });
//
//         if (!client) {
//             return {error: "Client not found"};
//         }
//
//         return {success: true, data: client};
//     } catch (error) {
//         if (error instanceof Error) {
//             return {error: error.message};
//         }
//         return {error: "Unexpected server error occurred. Please try again"};
//     }
// }

export const getClientPaymentHistoryById = async (id: string) => {
    try {
        const paymentHistory = await prisma.payment.findMany({
            where: {
                loan: {
                    clientId: id
                }
            },
            orderBy: {
                paymentDate: 'desc'
            }
        });

        if (!paymentHistory.length) {
            return { success: true, data: [] };
        }

        return { success: true, data: paymentHistory };

    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "Unexpected server error occurred. Please try again" };
    }
};