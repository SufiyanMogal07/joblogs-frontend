import z from "zod";

const baseAuthObject = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name should be atleast of 3 characters!")
    .max(30, "Name should not exceed 30 characters!"),
  email: z
    .string()
    .trim()
    .email("Invalid email address!")
    .max(50, "Email should not exceed 50 characters!"),
  password: z
    .string()
    .min(6, "Password should be atleast of 6 characters")
    .max(15, "Password should not exceed 15 characters!"),
});

export const registerSchema = baseAuthObject.extend({});
export const loginSchema = baseAuthObject.omit({ name: true });

export type registerValues = z.infer<typeof registerSchema>;
export type loginValues = z.infer<typeof loginSchema>;



export const UserProfileSchema = z.object({
  name: z.string().trim().min(3, "Full name is required"),
  email: z.email().trim().min(4, "Email is required"),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type userIdType = string;
