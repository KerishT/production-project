import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import SvgIcon from 'shared/assets/icons/svg-icon.svg';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                text: 'Главная',
                Icon: SvgIcon,
            },
            {
                path: RoutePath.about,
                text: 'О сайте',
                Icon: SvgIcon,
            }
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData.id,
                    text: 'Профиль',
                    Icon: SvgIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath.articles,
                    text: 'Статьи',
                    Icon: SvgIcon,
                    authOnly: true,
                }
            );
        }

        return sidebarItemsList;
    }
);
