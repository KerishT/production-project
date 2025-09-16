import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';
import { Profile } from '../../model/types/profile';
import { ProfileCardDeprecated, ProfileCardErrorDeprecated, ProfileCardLoaderDeprecated } from './ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardErrorRedesigned, ProfileCardRedesigned, ProfileCardSkeletonRedesigned } from './ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
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
        isLoading,
        error
    } = props;

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardSkeletonRedesigned />}
                off={<ProfileCardLoaderDeprecated />}
            />
        );
    }

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ProfileCardErrorRedesigned />}
                off={<ProfileCardErrorDeprecated />}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <ProfileCardRedesigned {...props} />
            )}
            off={(
                <ProfileCardDeprecated {...props} />
            )}
        />
    );
};
