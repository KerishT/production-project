import type {
    ReduxStoreWithManager, StateSchema, ThunkExtraArg, ThunkConfig
} from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
    createReduxStore,
    ReduxStoreWithManager,
    StoreProvider,
    ThunkExtraArg
};

export type { AppDispatch, ThunkConfig, StateSchema };
