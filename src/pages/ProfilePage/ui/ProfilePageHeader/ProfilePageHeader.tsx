import { FC, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions, updateProfileData } from 'entities/Profile';
import { useSelector } from 'react-redux';
import { getCanEditProfile } from 'entities/Profile/model/selectors/getCanEditProfile/getCanEditProfile';
import cls from './ProfilePageHeader.module.scss';

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
        <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
            <Text title={t('profil')} />

            {canEdit && (
                <div className={cls.btnsWrapper}>
                    {readonly
                        ? (
                            <Button
                                onClick={onEdit}
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE}
                            >
                                {t('redaktirovat')}
                            </Button>
                        )
                        : (
                            <>
                                <Button
                                    onClick={onCancelEdit}
                                    className={cls.editBtn}
                                    theme={ButtonTheme.OUTLINE_RED}
                                >
                                    {t('otmenit')}
                                </Button>

                                <Button
                                    onClick={onSave}
                                    className={cls.saveBtn}
                                    theme={ButtonTheme.OUTLINE}
                                >
                                    {t('sohranit')}
                                </Button>
                            </>
                        )}
                </div>
            )}

        </div>
    );
};
