import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string
}

export const LoginForm: FC<LoginFormProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Input autofocus className={cls.input} placeholder={t('Vvedite username')} />
            <Input className={cls.input} placeholder={t('Vvedite parol')} />
            <Button className={cls.loginBtn}>{t('voiti')}</Button>
        </div>
    );
};
