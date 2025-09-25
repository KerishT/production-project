import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card
                    max
                    padding="16"
                >
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
                                            data-testid="EditableProfileCardHeader.EditButton"
                                        >
                                            {t('redaktirovat')}
                                        </Button>
                                    )
                                    : (
                                        <HStack gap="8">
                                            <Button
                                                onClick={onCancelEdit}
                                                data-testid="EditableProfileCardHeader.CancelButton"
                                                color="error"
                                            >
                                                {t('otmenit')}
                                            </Button>

                                            <Button
                                                onClick={onSave}
                                                data-testid="EditableProfileCardHeader.SaveButton"
                                                color="success"
                                            >
                                                {t('sohranit')}
                                            </Button>
                                        </HStack>
                                    )}
                            </div>
                        )}
                    </HStack>
                </Card>
            )}
            off={(
                <HStack
                    justify="between"
                    className={classNames('', {}, [className])}
                    max
                >
                    <TextDeprecated title={t('profil')} />

                    {canEdit && (
                        <div>
                            {readonly
                                ? (
                                    <ButtonDeprecated
                                        onClick={onEdit}
                                        theme={ButtonTheme.OUTLINE}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('redaktirovat')}
                                    </ButtonDeprecated>
                                )
                                : (
                                    <HStack gap="8">
                                        <ButtonDeprecated
                                            onClick={onCancelEdit}
                                            theme={ButtonTheme.OUTLINE_RED}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                        >
                                            {t('otmenit')}
                                        </ButtonDeprecated>

                                        <ButtonDeprecated
                                            onClick={onSave}
                                            theme={ButtonTheme.OUTLINE}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                        >
                                            {t('sohranit')}
                                        </ButtonDeprecated>
                                    </HStack>
                                )}
                        </div>
                    )}
                </HStack>
            )}
        />
    );
});
