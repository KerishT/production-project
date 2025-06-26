import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={classNames('', {}, [className])}
            direction="bottom left"
            trigger={(
                <Avatar
                    fallbackInverted
                    src={authData.avatar}
                    alt={authData.username}
                    size={30}
                />
            )}
            items={[
                ...(isAdminPanelAvailable
                    ? [{
                        content: t('Admin'),
                        href: getRouteAdmin()
                    }] : []),
                {
                    content: t('Profile'),
                    href: getRouteProfile(authData.id)
                },
                {
                    content: t('viyti'),
                    onClick: onLogout
                }
            ]}
        />
    );
});
