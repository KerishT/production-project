import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../module/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const sidebarItemsList = useSelector(getSidebarItems);
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const itemsList = useMemo(() => sidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed, sidebarItemsList]);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <aside
                    className={classNames(cls.SidebarRedesigned, { [cls.collapsed]: collapsed }, [
                        className
                    ])}
                    data-testid="sidebar"
                >
                    <AppLogo className={cls.appLogo} />
                </aside>
            )}
            off={(
                <aside
                    className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
                        className
                    ])}
                    data-testid="sidebar"
                >
                    <Button
                        className={classNames(cls.collapseBtn)}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        data-testid="sidebar-toggle"
                        onClick={onToggle}
                        size={ButtonSize.L}
                        square
                    >
                        {collapsed ? '>' : '<'}
                    </Button>

                    <VStack
                        role="navigation"
                        className={cls.items}
                        gap="8"
                    >
                        {itemsList}
                    </VStack>

                    <div className={cls.switchers}>
                        <ThemeSwitcher />

                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
                </aside>
            )}
        />
    );
});
