import { FeatureFlags } from '@/shared/types/featureFlags';
import { UserRole } from '../consts/userConsts';
import { JsonSettings } from './jsonSettings';

export interface User {
  id: string,
  username: string,
  roles?: UserRole[],
  features?: FeatureFlags,
  avatar?: string,
  jsonSettings?: JsonSettings
}

export interface UserSchema {
  authData?: User,

  _inited?: boolean
}
