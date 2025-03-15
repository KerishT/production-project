import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

export function createReduxStore(initialStore?: StateSchema) {
    const rootRecucer: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    };

    return configureStore<StateSchema>({
        reducer: rootRecucer,
        devTools: __IS_DEV__,
        preloadedState: initialStore,
    });
}
