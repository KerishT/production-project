import { memo, useCallback } from 'react';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { Theme } from '@/shared/const/theme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import cls from './ThemeSwitcher.module.scss';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings } from '@/entities/User';
import { Icon } from '@/shared/ui/deprecated/Icon';

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
        <Button
            className={classNames(cls.ThemeSwitcher, {}, [className])}
            onClick={onToggleHandler}
            theme={ButtonTheme.CLEAR}
        >
            <Icon Svg={SvgIcon} width={24} height={24} inverted />
        </Button>
    );
});
