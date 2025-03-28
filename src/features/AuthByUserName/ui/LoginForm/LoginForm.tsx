import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useDispatch, useSelector } from 'react-redux';
import { loginByUserName } from 'features/AuthByUserName/model/services/loginByUserName/loginByUserName';
import { loginActions } from '../../model/slice/loginSlice';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispath = useDispatch();
    const { t } = useTranslation();
    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispath(loginActions.setUsername(value));
    }, [dispath]);

    const onChangePassword = useCallback((value: string) => {
        dispath(loginActions.setPassword(value));
    }, [dispath]);

    const onLoginClick = useCallback(() => {
        dispath(loginByUserName({ username, password }));
    }, [dispath, username, password]);

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('forma-aftorizacii')} />

            {error && <Text text={t('Vi-vveli-neverniy-login-ili-parol')} theme={TextTheme.ERROR} />}

            <Input
                autofocus
                className={cls.input}
                onChange={onChangeUsername}
                placeholder={t('Vvedite username')}
                value={username}
            />

            <Input
                className={cls.input}
                onChange={onChangePassword}
                placeholder={t('Vvedite parol')}
                value={password}
            />

            <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.loginBtn}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('voiti')}
            </Button>
        </div>
    );
});
