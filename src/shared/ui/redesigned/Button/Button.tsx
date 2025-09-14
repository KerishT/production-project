import {
    ButtonHTMLAttributes, memo, ReactNode
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled'

export type ButtonSize = 'm' | 'l' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    variant?: ButtonVariant,
    square?: boolean,
    size?: ButtonSize,
    fullWidth?: boolean,
    disabled?: boolean,
    children?: ReactNode,
    addonLeft?: ReactNode,
    addonRight?: ReactNode
}

export const Button = memo(({
    className,
    children,
    variant = 'outline',
    square,
    size = 'm',
    fullWidth,
    disabled,
    addonLeft,
    addonRight,
    ...otherProps
}: ButtonProps) => {
    const mods: Mods = {
        [cls.square]: square,
        [cls.fullWidth]: fullWidth,
        [cls.disabled]: disabled
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}

            {children}

            {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
        </button>
    );
});
