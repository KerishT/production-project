import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Text } from '@/shared/ui/redesigned/Text';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUserName } from '../../model/services/loginByUserName/loginByUserName';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

export interface LoginFormProps {
    className?: string,
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const dispath = useAppDispatch();
    const { t } = useTranslation();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const forceUpdate = useForceUpdate();

    const onChangeUsername = useCallback((value: string) => {
        dispath(loginActions.setUsername(value));
    }, [dispath]);

    const onChangePassword = useCallback((value: string) => {
        dispath(loginActions.setPassword(value));
    }, [dispath]);

    const onLoginClick = useCallback(async () => {
        const result = await dispath(loginByUserName({ username, password }));

        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();

            forceUpdate();
        }
    }, [dispath, username, password, onSuccess, forceUpdate]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <VStack gap="16" className={classNames(cls.LoginFormRedesigned, {}, [className])}>
                        <Text title={t('forma-aftorizacii')} />

                        {error && (
                            <Text
                                text={t('Vi-vveli-neverniy-login-ili-parol')}
                                variant="error"
                            />
                        )}

                        <Input
                            id="LoginForm.Username"
                            autofocus
                            onChange={onChangeUsername}
                            placeholder={t('Vvedite username')}
                            value={username}
                        />

                        <Input
                            id="LoginForm.Password"
                            onChange={onChangePassword}
                            placeholder={t('Vvedite parol')}
                            value={password}
                        />

                        <Button
                            variant="outline"
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('voiti')}
                        </Button>
                    </VStack>
                )}
                off={(
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('forma-aftorizacii')} />

                        {error && (
                            <TextDeprecated
                                text={t('Vi-vveli-neverniy-login-ili-parol')}
                                theme={TextTheme.ERROR}
                            />
                        )}

                        <InputDeprecated
                            autofocus
                            className={cls.input}
                            onChange={onChangeUsername}
                            placeholder={t('Vvedite username')}
                            value={username}
                        />

                        <InputDeprecated
                            className={cls.input}
                            onChange={onChangePassword}
                            placeholder={t('Vvedite parol')}
                            value={password}
                        />

                        <ButtonDeprecated
                            theme={ButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('voiti')}
                        </ButtonDeprecated>
                    </div>
                )}
            />
        </DynamicModuleLoader>
    );
});

export default LoginForm;
