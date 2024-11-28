import { z } from "zod";

// Enum for the Block type
const BlockEnum = z.enum(["A", "B", "C", "D", "H1", "H2", "H3","H4", "H6"]);

// Zod Schema for OutpassInput
export const createOutpassSchema = z.object({
  name: z.string(), // Required string
  dateFrom: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "dateFrom is required" }
  ), // Required ISO date string
  dateTo: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    { message: "dateTo is required" }
  ), // Required ISO date string
  roomNo: z.string(), // Required string
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, "Contact number must be a valid 10-digit number"), // Required 10-digit number
  reason: z.string(), // Required string
  block_or_building: BlockEnum, // Required enum value
  userId: z.string().optional(), // Required string
});