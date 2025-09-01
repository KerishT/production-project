import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string,
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>,
    inverted?: boolean
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Icon = memo((props: IconProps) => {
    const {
        className, Svg, inverted, ...other
    } = props;

    return (
        <Svg
            className={
                classNames(inverted
                    ? cls.inverted
                    : cls.Icon, {}, [className])
            }
            {...other}
        />
    );
});
