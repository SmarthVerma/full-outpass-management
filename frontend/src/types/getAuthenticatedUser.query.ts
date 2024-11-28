import { User } from "@/graphql/mutations/user.mutation";

export interface GetAuthenticatedUserResponse {
    authUser: User | undefined ;
}