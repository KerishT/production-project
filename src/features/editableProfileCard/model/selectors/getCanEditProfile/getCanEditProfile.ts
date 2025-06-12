import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, User } from '@/entities/User';
import { Profile } from '@/entities/Profile';
import { getProfileData } from '../getProfileData/getProfileData';

export const getCanEditProfile = createSelector(
    [getUserAuthData, getProfileData],
    (userData?: User, profileData?: Profile) => userData?.id === profileData?.id
);
