import { gql } from "@apollo/client";

// 1. Query to fetch the authenticated user
export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
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

// 2. Query to fetch a user by their ID
export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(userId: $userId) {
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

