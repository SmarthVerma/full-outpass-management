export const outpassTypeDef = `#graphql
enum Block {
  A
  B
  C
  D
  H1
  H2
  H3
  H4
  H5
  H6
}

enum HostelInput {
  AZAD_HOSTEL 
  PARMAR_HOSTEL
  SHASHTRI_HOSTEL
  GEETA_BHAWAN
}

  type Outpass {
    id: ID!
    name: String!
    dateFrom: String!
    dateTo: String!
    roomNo: Int!
    contactNumber: String!
    reason: String!
    block_or_building: Block!
    User: User  # FUCKING ALWAYS SAME NAME!!!!!!
    isCompleted: Boolean
    otpVerified: Boolean
    createdAt: String
  }

  # Input Type for Creating or Updating an Outpass
  input OutpassInput {
    name: String!
    dateFrom: String!
    dateTo: String!
    roomNo: Int!
    contactNumber: String!
    reason: String!
    block_or_building: Block!
    userId: String!  # Optional, to link to an existing user
    hostelName: HostelInput!
  }

  # Query to Fetch an Outpass or All Outpasses
  type Query {
    getAllOutpasses(hostelName: HostelInput): [Outpass!]!
    getOutpass(id: ID!): Outpass

  }
input UpdateOutpassInput {
  name: String
  dateFrom: String
  dateTo: String
  roomNo: Int
  contactNumber: String
  reason: String
  block_or_building: Block
  userId: String
}

input VerifyOtpInput {
  id: String
  code: String
}

input VerifyOutpassInput {
  id: String,
  emailTo: String
}
  # Mutations to Create, Update, or Delete an Outpass
  type Mutation {
    verifyOutpass(input: VerifyOutpassInput!): Outpass
    createOutpass(input: OutpassInput!): Outpass
    updateOutpass(id: ID!, input: UpdateOutpassInput!): Outpass
    deleteOutpass(id: ID!): Outpass
    verifyOtp(input: VerifyOtpInput!): Outpass
  }
`