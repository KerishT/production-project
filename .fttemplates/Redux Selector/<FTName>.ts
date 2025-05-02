import { StateSchema } from 'app/providers/StoreProvider';

export const get<FTName | capitalize> = (state: StateSchema) => state;
