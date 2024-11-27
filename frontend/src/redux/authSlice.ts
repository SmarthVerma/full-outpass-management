import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Gender = 'MALE' | 'FEMALE';

export interface User {
    id: string;         // Assuming ID is a string type
    name: string;
    password: string;
    isStudent?: boolean;
    validEmail?: boolean;
    email: string;
    gender?: Gender;    // Optional field with 'male', 'female', or 'other'
    createdAt: string;  // Keeping as string to represent DateTime
}

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