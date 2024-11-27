/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql } from "@apollo/client";
import { User } from "./user.mutation";

// 3. Mutation to create a new outpass
export const CREATE_OUTPASS = gql`
  mutation CreateOutpass($input: OutpassInput!) {
    createOutpass(input: $input) {
      id
      name
      dateFrom
      dateTo
      hostelNumber
      contactNumber
      reason
      block
     
    }
  }
`;

// 4. Mutation to update an existing outpass
export const UPDATE_OUTPASS = gql`
  mutation UpdateOutpass($id: ID!, $input: UpdateOutpassInput!) {
    updateOutpass(id: $id, input: $input) {
      id
      name
      dateFrom
      dateTo
      hostelNumber
      contactNumber
      reason
      block
      user {
        id
        username
      }
    }
  }
`;

// 5. Mutation to delete an outpass
export const DELETE_OUTPASS = gql`
  mutation DeleteOutpass($id: ID!) {
    deleteOutpass(id: $id) {
      id
      name
    }
  }
`;


// types

enum Block {
  A = "A",
  B = "B",
  C = "C",
  D = "D"
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
  isCompleted: boolean
  User: User; // Reference to the User model
  createdAt: Date
  hostelName: string
  otpVerified?: boolean
}

// Define the type for the entire GraphQL response
export interface GetAllOutpassesResponse {
  getAllOutpasses: Outpass[];
}

// Define the type for query variables
export interface GetAllOutpassesVariables {
  hostelName: string;
}