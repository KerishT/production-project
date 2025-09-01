import { memo, useCallback } from 'react';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string,
    text: string
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button onClick={onCopy} className={cls.copyBtn} theme={ButtonTheme.CLEAR}>
                <Icon Svg={SvgIcon} />
            </Button>

            <code>
                {text}
            </code>
        </pre>
    );
});
