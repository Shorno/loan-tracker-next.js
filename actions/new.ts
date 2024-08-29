// "use server"
// import prisma from "@/prisma/db";
// import {clientLoanSchema, paymentSchema} from "@/zod-schemas/clientSchema";
// import {auth} from "@/auth";
//
// // ... (previous code remains the same)
//
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
//         // Create payment and update loan in a transaction
//         const result = await prisma.$transaction(async (prisma) => {
//             const payment = await prisma.payment.create({
//                 data: {
//                     amount,
//                     savings,
//                     date,
//                     loanId,
//                 }
//             });
//
//             // Update the loan
//             const updatedLoan = await prisma.loan.update({
//                 where: {id: loanId},
//                 data: {
//                     paidAmount: {increment: amount},
//                     remainingAmount: {decrement: amount},
//                     totalSavings: {increment: savings},
//                 }
//             });
//
//             return {payment, updatedLoan};
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