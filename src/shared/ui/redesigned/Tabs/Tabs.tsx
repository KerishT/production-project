import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card';
import cls from './Tabs.module.scss';
import {
    Flex, FlexAlign, FlexDirection, FlexGap
} from '../Stack/Flex/Flex';

export interface TabItem {
    value: string,
    content: ReactNode
}

interface TabsProps {
    className?: string,
    tabs: TabItem[],
    value: string,
    direction?: FlexDirection,
    gap?: FlexGap,
    align?: FlexAlign,
    onTabClick: (tab: TabItem) => void
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick,
        direction = 'row',
        gap = '8',
        align = 'start'
    } = props;

    const onClickHandle = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <Flex
            direction={direction}
            gap={gap}
            align={align}
            className={classNames(cls.Tabs, {}, [className])}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;

                return (
                    <Card
                        variant={tab.value === value ? 'light' : 'normal'}
                        className={classNames(cls.tab, { [cls.selected]: isSelected })}
                        key={tab.value}
                        onClick={onClickHandle(tab)}
                        border="round"
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
