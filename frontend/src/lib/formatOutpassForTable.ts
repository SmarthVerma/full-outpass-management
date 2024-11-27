import { Outpass } from "@/graphql/mutations/outpass.mutation";
import { ColumnOutpass } from "@/outpasses-table/columns";

export const formatOutpassForTable = (
  outpasses: Outpass[] | undefined
): ColumnOutpass[] => {
    if(!outpasses) return []; 
  return outpasses.map((item) => {

const dateFrom = Number(item.dateFrom) // Convert to Date object
const dateTo = Number(item.dateTo)     // Convert to Date object
const creationTime = Number(item.createdAt)

const createdAt = new Date (creationTime).toDateString()
console.log('this is createdAt', createdAt)
// Log the parsed dates to check their values
console.log('dateFrom:', dateFrom); // Should display a valid Date object
console.log('dateTo:', dateTo);     // Should display a valid Date object

const dayDifferenceInMilliseconds = dateTo - dateFrom;

// Convert milliseconds to days
const leavePeriod = Math.round(dayDifferenceInMilliseconds / (1000 * 60 * 60 * 24)).toString();
console.log('dayDifference', leavePeriod)
    console.log("Checker", item)
    return {
      outpassId: item.id,
      id: item.User.id as string,
      name: item.name as string,
      email: item.User.email as string,
      leavePeriod,
      status: item.otpVerified ? "Verified" : "Pending",
      createdAt,
      contactNumber : item.contactNumber,
      dateTo,
      dateFrom,
      reason: item.reason,
      guardianContactNo: item.User.guardianContactNo,
      hostelName: item.hostelName,
      block: item.block_or_building,
      roomNumber: item.roomNo,
      isOtpVerified: item.otpVerified
    };
  });
};

export interface FormatOutpassTable {
  outpassId: string
  id: string;
  name: string;
  email: string;
  leavePeriod: Date; // Replace Date with actual type if needed
  status: "Verified" | "Pending";
  createdAt: Date;
  contactNumber?: string;
  dateTo: string;
  dateFrom: string;
  reason?: string;
  guardianContactNo: string;
  roomNo?: number;
  block_or_building?: string
  roomNumber: string,
}
