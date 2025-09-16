import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Loader as LoaderDeprecated } from '@/shared/ui/deprecated/Loader';
import { TextAlign, Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from '../ProfileCard';
import cls from './ProfileCardDeprecated.module.scss';

export const ProfileCardErrorDeprecated = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
            className={classNames(cls.ProfileCardDeprecated, {}, [cls.error])}
        >
            <TextDeprecated
                theme={TextTheme.ERROR}
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align={TextAlign.CENTER}
            />
        </HStack>
    );
};

export const ProfileCardLoaderDeprecated = () => (
    <HStack
        justify="center"
        max
        className={classNames(cls.ProfileCardDeprecated, {}, [cls.loading])}
    >
        <LoaderDeprecated />
    </HStack>
);

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        validateAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCurrency,
        onChangeCountry
    } = props;
    const { t } = useTranslation();

    const mods: Mods = {
        [cls.editing]: !readonly
    };

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.ProfileCardDeprecated, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    max
                    justify="center"
                >
                    <AvatarDeprecated
                        src={data.avatar}
                        alt={`${t('avatar')} ${data.username}`}
                        size={100}
                    />
                </HStack>
            )}

            <InputDeprecated
                value={data?.first}
                placeholder={t('vashe-imya')}
                readonly={readonly}
                onChange={onChangeFirstname}
                data-testid="ProfileCard.firstname"
            />

            <InputDeprecated
                value={data?.lastname}
                placeholder={t('vasha-familiya')}
                readonly={readonly}
                onChange={onChangeLastname}
                data-testid="ProfileCard.lastname"
            />

            <InputDeprecated
                value={data?.age}
                placeholder={t('vash-vozrast')}
                readonly={readonly}
                onChange={onChangeAge}
                validate={validateAge}
                data-testid="ProfileCard.age"
            />

            <InputDeprecated
                value={data?.city}
                placeholder={t('gorod')}
                readonly={readonly}
                onChange={onChangeCity}
                data-testid="ProfileCard.city"
            />

            <InputDeprecated
                value={data?.username}
                placeholder={t('vvedite-imya-polzovatelya')}
                readonly={readonly}
                onChange={onChangeUsername}
                data-testid="ProfileCard.username"
            />

            <InputDeprecated
                value={data?.avatar}
                placeholder={t('vvedite-ssilky-na-avatar')}
                readonly={readonly}
                onChange={onChangeAvatar}
                data-testid="ProfileCard.avatar"
            />

            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                readonly={readonly}
            />

            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </VStack>
    );
});
