import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from 'entities/Profile';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch();

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);

    const onChangeFirstname = (value?: string) => {
        dispatch(profileActions.updateProfileData({ first: value || '' }));
    };

    const onChangeLastname = (value?: string) => {
        dispatch(profileActions.updateProfileData({ lastname: value || '' }));
    };

    const onChangeAge = (value?: string) => {
        dispatch(profileActions.updateProfileData({ age: Number(value || 0) }));
    };

    const validateAge = (value?: string) => /^\d*$/.test(value ?? '');

    const onChangeCity = (value?: string) => {
        dispatch(profileActions.updateProfileData({ city: value || '' }));
    };

    const onChangeUsername = (value?: string) => {
        dispatch(profileActions.updateProfileData({ username: value || '' }));
    };

    const onChangeAvatar = (value?: string) => {
        dispatch(profileActions.updateProfileData({ avatar: value || '' }));
    };

    const onChangeCurrency = (currency: Currency) => {
        dispatch(profileActions.updateProfileData({ currency }));
    };

    const onChangeCountry = (country: Country) => {
        dispatch(profileActions.updateProfileData({ country }));
    };

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader readonly={readonly} />

                <ProfileCard
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    readonly={readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    validateAge={validateAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
