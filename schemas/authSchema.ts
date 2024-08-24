import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}).min(3, {message: "Name must be at least 3 characters long"}),
    email: z.string().min(1, {message: "Email is required"}).email({message: "Provided email address is not valid"}),
    password: z.string()
        .min(8, {message: "Password must be at least 8 characters long"})
        .regex(/[A-Z]/, {message: "Password must contain at least one uppercase letter"})
        .regex(/[a-z]/, {message: "Password must contain at least one lowercase letter"})
        .regex(/[0-9]/, {message: "Password must contain at least one number"})
        .regex(/[^a-zA-Z0-9]/, {message: "Password must contain at least one special character"}),
    confirmPassword: z.string()
        .min(1, {message: "Please confirm your password"})
        .min(8, {message: "Password must be at least 8 characters long"})
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export const loginSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({message: "Provided email address is not valid"}),
    password: z.string().min(1, {message: "Password is required"})
});
