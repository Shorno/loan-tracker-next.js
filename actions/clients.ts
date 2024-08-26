"use server"
import prisma from "@/prisma/db";
import {clientLoanSchema} from "@/schemas/clientSchema";
import {auth} from "@/auth";


export const createClientLoanAction = async (data: any) => {
    try {
        const validatedClientLoanData = clientLoanSchema.parse(data);

        const {
            name, phone, address, serialNumber,
            amount, interestRate, paidAmount
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
                    createdById: currentUserId,
                }
            });


            const loanAmount = parseInt(amount, 10);
            const loanInterestRate = parseInt(interestRate, 10);
            const loanPaidAmount = parseInt(paidAmount, 10);


            const totalPayable = Math.round(loanAmount * (1 + loanInterestRate / 100));
            const remainingAmount = totalPayable - loanPaidAmount;

            const loan = await prisma.loan.create({
                data: {
                    clientId: client.id,
                    amount: loanAmount.toString(),
                    interestRate: loanInterestRate.toString(),
                    paidAmount: loanPaidAmount.toString(),
                    totalPayable: totalPayable.toString(),
                    remainingAmount: remainingAmount.toString(),
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
