import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions, updateProfileData } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getCanEditProfile } from 'entities/Profile/model/selectors/getCanEditProfile/getCanEditProfile';
import { HStack } from 'shared/ui/Stack';

interface ProfilePageHeaderProps {
    className?: string,
    readonly?: boolean
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({ className, readonly }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const canEdit = useSelector(getCanEditProfile);

    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack
            justify="between"
            className={classNames('', {}, [className])}
            max
        >
            <Text title={t('profil')} />

            {canEdit && (
                <div>
                    {readonly
                        ? (
                            <Button
                                onClick={onEdit}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('redaktirovat')}
                            </Button>
                        )
                        : (
                            <HStack gap="8">
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t('otmenit')}
                                </Button>

                                <Button
                                    onClick={onSave}
                                    theme={ButtonTheme.OUTLINE}
                                >
                                    {t('sohranit')}
                                </Button>
                            </HStack>
                        )}
                </div>
            )}

        </HStack>
    );
};
