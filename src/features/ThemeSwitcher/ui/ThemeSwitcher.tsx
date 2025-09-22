import { memo, useCallback } from 'react';
import { saveJsonSettings } from '@/entities/User';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher = memo(({ className } : ThemeSwitcherProps) => {
    const { toggleTheme } = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme: Theme) => {
            dispatch(saveJsonSettings({ theme: newTheme }));
        });
    }, [dispatch, toggleTheme]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Icon
                    Svg={SvgIcon}
                    className={classNames(cls.ThemeSwitcher, {}, [className])}
                    clickable
                    onClick={onToggleHandler}
                    width={24}
                    height={24}
                />
            )}
            off={(
                <ButtonDeprecated
                    className={classNames(cls.ThemeSwitcher, {}, [className])}
                    onClick={onToggleHandler}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated Svg={SvgIcon} width={24} height={24} inverted />
                </ButtonDeprecated>
            )}
        />
    );
});
