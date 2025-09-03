import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile
} from '@/shared/const/router';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { SidebarItemType } from '../types/sidebar';
import { toggleFeatures } from '@/shared/lib/features';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                text: 'Главная',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => SvgIcon,
                    off: () => SvgIcon
                })
            },
            {
                path: getRouteAbout(),
                text: 'О сайте',
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => SvgIcon,
                    off: () => SvgIcon
                })
            }
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    text: 'Профиль',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => SvgIcon,
                        off: () => SvgIcon
                    }),
                    authOnly: true
                },
                {
                    path: getRouteArticles(),
                    text: 'Статьи',
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => SvgIcon,
                        off: () => SvgIcon
                    }),
                    authOnly: true
                }
            );
        }

        return sidebarItemsList;
    }
);
