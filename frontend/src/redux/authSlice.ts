import { User } from '@/graphql/mutations/user.mutation';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';




interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        storeAuthData: (state, action: PayloadAction<{ authUser?: User }>) => {
            state.isAuthenticated = !!action.payload.authUser;
            state.user = action.payload.authUser || null;
        }
    },
});

export const { storeAuthData } = authSlice.actions;
export default authSlice.reducer;