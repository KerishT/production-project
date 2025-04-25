import React from 'react';
import Icon from 'shared/assets/icons/svg-icon.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        text: 'Главная',
        Icon,
    },
    {
        path: RoutePath.about,
        text: 'О сайте',
        Icon,
    },
    {
        path: RoutePath.profile,
        text: 'Профиль',
        Icon,
        authOnly: true,
    },
    {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon,
        authOnly: true,
    }
];
