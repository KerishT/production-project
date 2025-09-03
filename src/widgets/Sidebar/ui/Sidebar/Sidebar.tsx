import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { getSidebarItems } from '../../module/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import cls from './Sidebar.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';

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
                    className={classNames(
                        cls.SidebarRedesigned,
                        { [cls.collapsedRedesigned]: collapsed },
                        [className]
                    )}
                    data-testid="sidebar"
                >
                    <AppLogo
                        className={cls.appLogo}
                        size={collapsed ? 30 : 50}
                    />

                    <VStack
                        role="navigation"
                        className={cls.items}
                        gap="8"
                    >
                        {itemsList}
                    </VStack>

                    <Icon
                        data-testid="sidebar-toggle"
                        Svg={SvgIcon}
                        className={classNames(cls.collapseBtn)}
                        clicable
                        onClick={onToggle}
                        width={14}
                        height={14}
                    />

                    <div className={cls.switchers}>
                        <ThemeSwitcher />

                        <LangSwitcher className={cls.lang} short={collapsed} />
                    </div>
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
