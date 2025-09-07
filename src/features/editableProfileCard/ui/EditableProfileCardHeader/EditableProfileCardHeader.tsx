import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text';
import { getCanEditProfile } from '../../model/selectors/getCanEditProfile/getCanEditProfile';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const canEdit = useSelector(getCanEditProfile);
    const readonly = useSelector(getProfileReadonly);

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
                                data-testid="EditableProfileCardHeader.EditButton"
                            >
                                {t('redaktirovat')}
                            </Button>
                        )
                        : (
                            <HStack gap="8">
                                <Button
                                    onClick={onCancelEdit}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    data-testid="EditableProfileCardHeader.CancelButton"
                                >
                                    {t('otmenit')}
                                </Button>

                                <Button
                                    onClick={onSave}
                                    theme={ButtonTheme.OUTLINE}
                                    data-testid="EditableProfileCardHeader.SaveButton"
                                >
                                    {t('sohranit')}
                                </Button>
                            </HStack>
                        )}
                </div>
            )}

        </HStack>
    );
});
