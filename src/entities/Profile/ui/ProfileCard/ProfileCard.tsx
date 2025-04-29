import { Country, CountrySelect } from 'entities/Country';
import { Currency, CurrencySelect } from 'entities/Currency';
import { Profile } from 'entities/Profile/model/types/profile';
import { useTranslation } from 'react-i18next';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
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
    onChangeCountry?: (country: Country) => void,
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
        onChangeCountry,
    } = props;

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.loading])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('proizoshla-oshibka-pri-zagruzke-profilya')}
                    text={t('poprobuite-obnovit-stranicu')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readonly,
    };

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.data}>
                {data?.avatar && (
                    <div className={cls.avatarWrapper}>
                        <Avatar
                            src={data.avatar}
                            alt={`${t('avatar')} ${data.username}`}
                        />
                    </div>
                )}

                <Input
                    value={data?.first}
                    placeholder={t('vashe-imya')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeFirstname}
                />

                <Input
                    value={data?.lastname}
                    placeholder={t('vasha-familiya')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeLastname}
                />

                <Input
                    value={data?.age}
                    placeholder={t('vash-vozrast')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeAge}
                    validate={validateAge}
                />

                <Input
                    value={data?.city}
                    placeholder={t('gorod')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeCity}
                />

                <Input
                    value={data?.username}
                    placeholder={t('vvedite-imya-polzovatelya')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeUsername}
                />

                <Input
                    value={data?.avatar}
                    placeholder={t('vvedite-ssilky-na-avatar')}
                    className={cls.input}
                    readonly={readonly}
                    onChange={onChangeAvatar}
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

            </div>
        </div>
    );
};
