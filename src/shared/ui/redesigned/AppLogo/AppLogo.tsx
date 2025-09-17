import { memo } from 'react';
import cls from './AppLogo.module.scss';
import { HStack } from '../Stack';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon';

interface AppLogoProps {
    className?: string,
    size?: number
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => (
    <HStack
        max
        justify="center"
        className={classNames(cls.appLogoWrapper, {}, [className])}
    >
        <div className={cls.gradientBig} />
        <div className={cls.gradientSmall} />

        <Icon
            Svg={SvgIcon}
            className={cls.appLogo}
            width={size}
            height={size}
        />
    </HStack>
));
