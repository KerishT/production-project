import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInited } from './model/selectors/getUserInited/getUserInited';
import { getUserRoles, isUserAdmin, isUserManager } from './model/selectors/roleSelectors';
import { userActions, userReducer } from './model/slice/userSlice';
import { User, UserSchema } from './model/types/user';
import { UserRole } from './model/consts/userConsts';
import { useJsonSettings } from './model/selectors/jsonSettings';
import { saveJsonSettings } from './model/services/saveJsonSettings';

export {
    getUserAuthData,
    getUserInited,
    userActions,
    userReducer,
    UserRole,
    getUserRoles,
    isUserAdmin,
    isUserManager,
    useJsonSettings,
    saveJsonSettings
};

export type { User, UserSchema };
