import  z  from "zod";

export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  userType: z.enum(["student", "faculty"]),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(20, "Password must be at most 20 characters long"),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
});