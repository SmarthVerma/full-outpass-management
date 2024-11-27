import { USER_FACULTY, USER_STUDENT } from "@/assets/constant";
import { z } from "zod";


export const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Email must be at least 2 characters long." })
    .regex(/@juitsolan\.in$/, { message: "Email must end with @juitsolan.in." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  userType: z.enum([USER_STUDENT, USER_FACULTY])
});