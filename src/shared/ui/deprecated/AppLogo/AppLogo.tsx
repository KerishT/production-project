import React, { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';

interface AppLogoProps {
    className?: string
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const AppLogo = memo(({ className }: AppLogoProps) => (
    <HStack
        max
        justify="center"
        className={classNames(cls.appLogoWrapper, {}, [className])}
    >
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />

        <Icon Svg={SvgIcon} className={cls.icon} width="80" height="80" />
    </HStack>
));
