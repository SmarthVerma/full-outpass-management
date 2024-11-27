import { gql } from "@apollo/client";

// 3. Mutation to sign up a new user
export const SIGNUP_USER = gql`
  mutation SignUpUser($input: SignUpInput!) {
    signup(input: $input) {
      id
      name
      email
      gender
      isStudent
      validEmail
      createdAt
    }
  }
`;

// 4. Mutation to log in a user
export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      id
      name
      email
      gender
      isStudent
      validEmail
      createdAt
    }
  }
`;

// 5. Mutation to log out a user
export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logout {
      message
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($verifyToken: String!) {
    verifyUser(verifyToken: $verifyToken) {
      id
      validEmail
    }
  }
`;
export const SEND_EMAIL_TO = gql`
mutation SendEmailTo($input: SendEmailInput!) {
  sendEmailTo(input: $input) {
    message
    sucess
  }
}
`

export const RESEND_VERIFICATION = gql`
mutation Mutation($email: String!) {
  resendVerificationCode(email: $email) {
    message
    sucess
  }
}`

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export interface User {
  id: string; // ID is typically represented as a string
  name: string;
  password: string;
  isStudent?: boolean; // Optional field
  userType: string;
  validEmail: boolean;
  email: string;
  gender?: Gender; // Optional field, corresponds to the "Gender" enum
  createdAt: string; // ISO 8601 date-time string
  guardianContactNo?: string // from dataBase
}
