import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, User } from 'entities/User';
import { getProfileData } from '../getProfileData/getProfileData';
import { Profile } from '../../types/profile';

export const getCanEditProfile = createSelector(
    [getUserAuthData, getProfileData],
    (userData?: User, profileData?: Profile) => userData?.id === profileData?.id
);
