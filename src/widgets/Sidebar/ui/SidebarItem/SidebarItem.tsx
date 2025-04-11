import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { t } from 'i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarItemType } from 'widgets/Sidebar/module/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => (
    <AppLink
        theme={AppLinkTheme.SECONDARY}
        to={item.path}
        className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
        <item.Icon className={cls.icon} />

        <span className={classNames(cls.link)}>
            {t(item.text)}
        </span>
    </AppLink>
));
