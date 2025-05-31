import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfileReadonly,
    getProfileValidateErrors,
    profileActions,
    ProfileCard,
    profileReducer,
    ValidateProfileError
} from 'entities/Profile';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'widgets/Page/Page';
import { VStack } from 'shared/ui/Stack';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer
};

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_AGE]: t('nekorretniy-vozrast'),
        [ValidateProfileError.INCORRECT_COUNTRY]: t('nekorretnaz-region'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('imya-i-vozrast-obyazatelni'),
        [ValidateProfileError.SERVER_ERROR]: t('servernaya-oshibka-pri-sohranenii'),
        [ValidateProfileError.NO_DATA]: t('dannie-ne-ukazani')
    };

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

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <VStack gap="16" max>
                    <ProfilePageHeader readonly={readonly} />

                    {validateErrors?.length && validateErrors.map((err) => (
                        <Text
                            text={validateErrorTranslates[err]}
                            key={err}
                            theme={TextTheme.ERROR}
                        />
                    ))}

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
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
