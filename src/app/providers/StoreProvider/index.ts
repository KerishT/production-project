import type {
    StateSchema, ThunkExtraArg, ThunkConfig, StateSchemaKey,
    ReduxStoreWithManager
} from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
    createReduxStore,
    StoreProvider,
    ThunkExtraArg
};

export type {
    ReduxStoreWithManager,
    AppDispatch,
    ThunkConfig,
    StateSchema,
    StateSchemaKey
};
