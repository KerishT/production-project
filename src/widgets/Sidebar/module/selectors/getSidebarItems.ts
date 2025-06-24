import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile
} from '@/shared/const/router';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: SvgIcon
            },
            {
                path: getRouteAbout(),
                text: 'О сайте',
                Icon: SvgIcon
            }
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    Icon: SvgIcon,
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    Icon: SvgIcon,
                    authOnly: true
                }
            );
        }

        return sidebarItemsList;
    }
);
