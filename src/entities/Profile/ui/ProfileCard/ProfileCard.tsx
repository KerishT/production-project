import { useTranslation } from 'react-i18next';
import { Country, CountrySelect } from '@/entities/Country';
import { Currency, CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/deprecated/Stack';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string,
    data?: Profile,
    isLoading?: boolean,
    error?: string,
    readonly?: boolean,
    onChangeFirstname?: (value: string) => void,
    onChangeLastname?: (value: string) => void,
    onChangeAge?: (value: string) => void,
    validateAge?: (value: string) => boolean,
    onChangeCity?: (value: string) => void,
    onChangeAvatar?: (value: string) => void,
    onChangeUsername?: (value: string) => void,
    onChangeCurrency?: (currency: Currency) => void,
    onChangeCountry?: (country: Country) => void
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
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

    if (isLoading) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
            >
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                max
                justify="center"
                className={classNames(cls.ProfileCard, {}, [className, cls.error])}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t('proizoshla-oshibka-pri-zagruzke-profilya')}
                    text={t('poprobuite-obnovit-stranicu')}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly
    };

    return (
        <VStack
            gap="16"
            max
            className={classNames(cls.ProfileCard, mods, [className])}
        >
            {data?.avatar && (
                <HStack
                    max
                    justify="center"
                    className={cls.avatarWrapper}
                >
                    <Avatar
                        src={data.avatar}
                        alt={`${t('avatar')} ${data.username}`}
                        size={100}
                    />
                </HStack>
            )}

            <Input
                value={data?.first}
                placeholder={t('vashe-imya')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeFirstname}
                data-testid="ProfileCard.firstname"
            />

            <Input
                value={data?.lastname}
                placeholder={t('vasha-familiya')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeLastname}
                data-testid="ProfileCard.lastname"
            />

            <Input
                value={data?.age}
                placeholder={t('vash-vozrast')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeAge}
                validate={validateAge}
                data-testid="ProfileCard.age"
            />

            <Input
                value={data?.city}
                placeholder={t('gorod')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeCity}
                data-testid="ProfileCard.city"
            />

            <Input
                value={data?.username}
                placeholder={t('vvedite-imya-polzovatelya')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeUsername}
                data-testid="ProfileCard.username"
            />

            <Input
                value={data?.avatar}
                placeholder={t('vvedite-ssilky-na-avatar')}
                className={cls.input}
                readonly={readonly}
                onChange={onChangeAvatar}
                data-testid="ProfileCard.avatar"
            />

            <CurrencySelect
                value={data?.currency}
                onChange={onChangeCurrency}
                className={cls.select}
                readonly={readonly}
            />

            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                className={cls.select}
                readonly={readonly}
            />
        </VStack>
    );
};
