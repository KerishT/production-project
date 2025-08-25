import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/jsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<JsonSettings, JsonSettings, ThunkConfig<string>>(
    'user/saveJsonSettings',
    async (newJsonSettings, thunkAPI) => {
        const {
            rejectWithValue, getState, dispatch
        } = thunkAPI;
        const authData = getUserAuthData(getState());
        const currentJsonSettings = getJsonSettings(getState());

        try {
            if (!authData) {
                throw new Error();
            }

            const response = await dispatch(setJsonSettingsMutation({
                userId: authData.id,
                jsonSettings: {
                    ...currentJsonSettings,
                    ...newJsonSettings
                }
            })).unwrap();

            if (!response.jsonSettings) {
                throw new Error();
            }

            return response.jsonSettings;
        } catch (e) {
            console.log(e);

            return rejectWithValue('error');
        }
    }
);
