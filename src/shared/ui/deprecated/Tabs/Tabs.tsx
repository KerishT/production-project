import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem {
    value: string,
    content: ReactNode
}

interface TabsProps {
    className?: string,
    tabs: TabItem[],
    value: string,
    onTabClick: (tab: TabItem) => void
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
    const {
        className, tabs, value, onTabClick
    } = props;

    const onClickHandle = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    className={cls.tab}
                    key={tab.value}
                    onClick={onClickHandle(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
