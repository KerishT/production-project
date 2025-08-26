import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const {
            rejectWithValue, dispatch
        } = thunkAPI;
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        console.log(userId);

        try {
            if (!userId) {
                throw new Error();
            }

            const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

            console.log(response);

            return response;
        } catch (e) {
            console.log(e);

            return rejectWithValue('error');
        }
    }
);
