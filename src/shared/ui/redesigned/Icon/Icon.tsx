import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { IconProps } from './types';
import cls from './Icon.module.scss';

export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, width = 32, height = 32, clicable, 'data-testid': dataTestId, ...other
    } = props;

    const icon = (
        <Svg
            className={
                classNames(cls.Icon, {}, [className])
            }
            width={width}
            height={height}
            {...other}
            onClick={undefined}
        />
    );

    if (clicable) {
        return (
            <button
                data-testid={dataTestId}
                type="button"
                onClick={props.onClick}
                className={cls.button}
                style={{ width, height }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
