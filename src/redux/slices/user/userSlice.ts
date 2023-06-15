import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserDetailAPI, loginAPI, logoutAPI, registerAPI } from '../../../api/user/userApi';
import { toast } from 'react-toastify';

interface UserStateType {
    user?: User;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    token?: string;
    socket?: any;
}

const initialState: UserStateType = {
    isLoading: false,
    isError: false,
    isSuccess: false
};

export const getUserDetailAction = createAsyncThunk<User, string>('user/me', async (token) => {
    return await getUserDetailAPI(token);
});

export const signinAction = createAsyncThunk<any, AuthForm>('user/login', async (data, { dispatch }) => {
    const token = await loginAPI(data.email, data.password);
    dispatch(getUserDetailAction(token));
    return;
});

export const logoutAction = createAsyncThunk('user/logout', async () => {
    return await logoutAPI();
});

export const registerAction = createAsyncThunk<any, AuthForm>('user/register', async (data) => {
    return await registerAPI(data.email, data.password);
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cleanStatusState: (state: UserStateType) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
        },
        setSocket: (state, action: PayloadAction<any>) => {
            state.socket = action.payload.socket;
        }
    },
    extraReducers: (builder) => {
        //Login
        builder.addCase(signinAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signinAction.fulfilled, (state, { payload }) => {
            toast.success('Login successfully');
            state.isSuccess=true
        });
        builder.addCase(signinAction.rejected, (state, { error }) => {
            state.isLoading = false;
            toast.error(error.message);
        });

        //Logout

        builder.addCase(logoutAction.fulfilled, (state, { payload }) => {
            localStorage.removeItem('token');
            state.user = undefined;
        });
        builder.addCase(logoutAction.rejected, () => {});

        //Get user details
        builder.addCase(getUserDetailAction.fulfilled, (state, { payload }) => {
            state.user = payload;
            localStorage.setItem('token', payload.token ?? '');
            state.isLoading = false;
        });

        builder.addCase(getUserDetailAction.rejected, (state) => {
            state.isLoading = false;
        });

        // Register
        builder.addCase(registerAction.pending, (state) => {
            state.isLoading = true;
            state.isSuccess = false;
        });
        builder.addCase(registerAction.fulfilled, (state) => {
            state.isLoading = false;
            state.isSuccess = true;
            toast.success('Registered successfully! Please login!');
        });
        builder.addCase(registerAction.rejected, (state, { error }) => {
            state.isLoading = false;
            state.isSuccess = false;
            toast.error(error.message);
        });
    }
});

const { reducer, actions } = userSlice;
export const { cleanStatusState, setSocket } = actions;

export default reducer;
