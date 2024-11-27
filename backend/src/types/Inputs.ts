// Enums
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

// Types
export interface User {
  id: string;
  name: string;
  password: string;
  isStudent?: boolean;
  validEmail: boolean;
  email: string;
  gender: Gender;
  createdAt: string; // Consider using Date type if working with dates
}

// Input Types
export interface SignUpInput {
  email: string;
  password: string;
  gender: Gender;
  userType: string
}

export interface LoginInput {
  email: string;
  password: string;
  userType : string
}

// Mutation Response Types
export interface LogoutResponse {
  message: string;
}

// Enums
export enum Block {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6"
}

// Types
export interface User {
  id: string;
  name: string;
  password: string;
  isStudent?: boolean;
  validEmail: boolean;
  email: string;
  gender: Gender;
  createdAt: string; // Consider using Date type if working with dates
  guardianContactNo: string
}

export interface Outpass {
  id: string;
  name: string;
  dateFrom: string; // You can use Date type if it's always a date
  dateTo: string;   // Same as above
  hostelNumber: string;
  contactNumber: string;
  reason: string;
  block: Block;
  user: User; // Reference to the User model
  otp: string
}

enum HostelNames {
 AZAD_HOSTEL = "AZAD_HOSTEL",
 PARMAR_HOSTEL = "PARMAR_HOSTEL",
 SHASHTRI_HOSTEL = "SHASHTRI_HOSTEL",
 GEETA_BHAWAN = "GEETA_BHAWAN",
}
export type HostelInput ={
  hostelName: HostelNames
}

// Input Types
export interface OutpassInput {
  name: string;
  dateFrom: string; // Same as above, consider Date type if working with actual dates
  dateTo: string;   // Same as above
  roomNo: number;
  contactNumber: string;
  reason: string;
  block_or_building: Block;
  userId?: string;  // Optional field to link to an existing user
  hostelName: HostelNames
  otpVerified: boolean
  
}

export interface UpdateOutpassInput {
  name?: string;
  dateFrom?: string;
  dateTo?: string;
  roomNo?: number;
  contactNumber?: string;
  reason?: string;
  block?: Block;
  userId?: string;
}

export interface VerifyTokenInput {
  verifyToken: string
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

export interface SendEmailInput {
  sendTo: string;
  sendFrom: string;
  message: string;
}

export interface VerifyOtpInput {
  id: string,
  code: string
}