import { memo, useCallback } from 'react';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '../../deprecated/Button/Button';
import { Icon as IconDeprecated } from '../../deprecated/Icon';
import { Icon } from '../Icon';
import cls from './Code.module.scss';

interface CodeProps {
    className?: string,
    text: string
}

export const Code = memo((props: CodeProps) => {
    const { className, text } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <pre
                    className={classNames(cls.CodeRedesigned, {}, [className])}
                >
                    <Icon
                        clickable
                        onClick={onCopy}
                        className={cls.copyBtn}
                        Svg={SvgIcon}
                    />
                    <code>{text}</code>
                </pre>
            )}
            off={(
                <pre className={classNames(cls.Code, {}, [className])}>
                    <ButtonDeprecated
                        onClick={onCopy}
                        className={cls.copyBtn}
                        theme={ButtonTheme.CLEAR}
                    >
                        <IconDeprecated Svg={SvgIcon} />
                    </ButtonDeprecated>
                    <code>{text}</code>
                </pre>
            )}
        />
    );
});
