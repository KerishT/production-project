import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData';
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
    const { t } = useTranslation('profile');

    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <div className={cls.header}>
                <Text title={t('profil')} />

                <Button className={cls.editBtn}>{t('redaktirovat')}</Button>
            </div>

            <div className={cls.data}>
                <Input
                    value={data?.first}
                    placeholder={t('vashe-imya')}
                    className={cls.input}
                />

                <Input
                    value={data?.lastname}
                    placeholder={t('vasha-familiya')}
                    className={cls.input}
                />
            </div>
        </div>
    );
};
