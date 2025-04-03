import { getLoginError } from 'features/AuthByUserName/model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from 'features/AuthByUserName/model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from 'features/AuthByUserName/model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from 'features/AuthByUserName/model/selectors/getLoginUsername/getLoginUsername';
import { loginByUserName } from 'features/AuthByUserName/model/services/loginByUserName/loginByUserName';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispath = useDispatch();
    const { t } = useTranslation();
    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

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
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
