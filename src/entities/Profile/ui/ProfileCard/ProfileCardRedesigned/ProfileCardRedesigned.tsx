import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { Input } from '@/shared/ui/redesigned/Input';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ProfileCardProps } from '../ProfileCard';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

export const ProfileCardErrorRedesigned = () => {
    const { t } = useTranslation();

    return (
        <HStack
            justify="center"
            max
        >
            <Text
                variant="error"
                title={t('Произошла ошибка при загрузке профиля')}
                text={t('Попробуйте обновить страницу')}
                align="center"
            />
        </HStack>
    );
};

export const ProfileCardSkeletonRedesigned = () => (
    <Card padding="24" max>
        <VStack gap="32">
            <HStack max justify="center">
                <Skeleton border="100%" width={120} height={120} />
            </HStack>
            <HStack gap="32" max>
                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} border="48px" />
                    <Skeleton width="100%" height={38} border="48px" />
                    <Skeleton width="100%" height={38} border="48px" />
                    <Skeleton width="100%" height={38} border="48px" />
                </VStack>

                <VStack gap="16" max>
                    <Skeleton width="100%" height={38} border="48px" />
                    <Skeleton width="100%" height={38} border="48px" />
                    <Skeleton width="200px" height={38} border="48px" />
                    <Skeleton width="200px" height={38} border="48px" />
                </VStack>
            </HStack>
        </VStack>
    </Card>
);

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

    return (
        <Card
            max
            padding="24"
            className={className}
        >
            <VStack gap="32">
                {data?.avatar && (
                    <HStack
                        max
                        justify="center"
                    >
                        <Avatar
                            src={data.avatar}
                            alt={`${t('avatar')} ${data.username}`}
                            size={120}
                        />
                    </HStack>
                )}

                <HStack
                    max
                    gap="24"
                >
                    <VStack
                        max
                        gap="16"
                    >
                        <Input
                            id="firstname"
                            value={data?.first}
                            label={`${t('Name')}:`}
                            readonly={readonly}
                            onChange={onChangeFirstname}
                            data-testid="ProfileCard.firstname"
                        />

                        <Input
                            id="lastname"
                            value={data?.lastname}
                            label={`${t('Surname')}:`}
                            readonly={readonly}
                            onChange={onChangeLastname}
                            data-testid="ProfileCard.lastname"
                        />

                        <Input
                            id="age"
                            value={data?.age}
                            label={`${t('Age')}:`}
                            readonly={readonly}
                            onChange={onChangeAge}
                            validate={validateAge}
                            data-testid="ProfileCard.age"
                        />

                        <Input
                            id="city"
                            value={data?.city}
                            label={`${t('gorod')}:`}
                            readonly={readonly}
                            onChange={onChangeCity}
                            data-testid="ProfileCard.city"
                        />
                    </VStack>

                    <VStack
                        max
                        gap="16"
                    >
                        <Input
                            id="username"
                            value={data?.username}
                            label={`${t('Username')}:`}
                            readonly={readonly}
                            onChange={onChangeUsername}
                            data-testid="ProfileCard.username"
                        />

                        <Input
                            id="avatar"
                            value={data?.avatar}
                            label={`${t('Avatar')}:`}
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
                </HStack>
            </VStack>
        </Card>
    );
});
