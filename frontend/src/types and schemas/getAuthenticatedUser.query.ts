import { User } from "../redux/authSlice";

export interface GetAuthenticatedUserResponse {
    authUser: User | undefined ;
}