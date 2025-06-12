import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { ValidateProfileError } from '../../model/consts/consts';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader';

const reducers: ReducersList = {
    profile: profileReducer
};

interface EditableProfileCardProps {
    className?: string,
    id?: string
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

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
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                max
                gap="16"
                className={classNames('', {}, [className])}
            >
                <EditableProfileCardHeader />

                {validateErrors?.length && validateErrors.map((err) => (
                    <Text
                        text={validateErrorTranslates[err]}
                        key={err}
                        theme={TextTheme.ERROR}
                        data-testid="EditableProfileCard.Error"
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
        </DynamicModuleLoader>
    );
});
