import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Overlay.module.scss';

interface OverlayProps {
    className?: string,
    onClick?: () => void
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Overlay = memo((props: OverlayProps) => {
    const { className, onClick } = props;

    return (
        <div onClick={onClick} className={classNames(cls.Overlay, {}, [className])} />
    );
});
