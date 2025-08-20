import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../consts/userConsts';

export interface User {
  id: string,
  username: string,
  roles?: UserRole[],
  features?: FeatureFlags,
  avatar?: string
}

export interface UserSchema {
  authData?: User,

  _inited?: boolean
}
