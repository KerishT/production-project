import axios from 'axios';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/helpers/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUserName } from './loginByUserName';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName.test', () => {
    test('success login', async () => {
        const userValue = { id: '1', username: 'admin' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
    });

    test('err or login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ staus: 403 }));

        const thunk = new TestAsyncThunk(loginByUserName);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });

        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
