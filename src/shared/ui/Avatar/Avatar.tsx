import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '../AppImage';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import cls from './Avatar.module.scss';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt: string,
    fallbackInverted?: boolean
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt,
        fallbackInverted = false
    } = props;
    const styles = useMemo<CSSProperties>(() => ({
        width: size,
        height: size
    }), [size]);

    const fallback = (
        <Skeleton
            width={32}
            height={32}
            border="50%"
        />
    );
    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            Svg={SvgIcon}
            width={32}
            height={32}
        />
    );

    return (
        <AppImage
            style={styles}
            className={classNames(cls.Avatar, {}, [className])}
            alt={alt}
            src={src}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    );
});
