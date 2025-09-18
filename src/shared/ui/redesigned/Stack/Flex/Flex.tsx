import { Additional, classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Flex.module.scss';
import {
    justifyClasses, alignClasses, directionClasses, gapClasses
} from './consts';
import { FlexProps } from './types';

export const Flex = (props: FlexProps) => {
    const {
        className,
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        wrap = 'nowrap',
        gap,
        max,
        ...otherProps
    } = props;

    const additional: Additional = [
        className,
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        cls[wrap],
        gap && gapClasses[gap]
    ];

    const mods: Mods = {
        [cls.max]: max
    };

    return (
        <div
            className={classNames(cls.Flex, mods, additional)}
            {...otherProps}
        >
            {children}
        </div>
    );
};
