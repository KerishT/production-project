import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions
} from '@/entities/User';
import { RoutePath } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
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
                    src={authData.avatar}
                    alt={authData.username}
                    size={30}
                />
            )}
            items={[
                ...(isAdminPanelAvailable
                    ? [{
                        content: t('Admin'),
                        href: RoutePath.admin_panel
                    }] : []),
                {
                    content: t('Profile'),
                    href: RoutePath.profile + authData.id
                },
                {
                    content: t('viyti'),
                    onClick: onLogout
                }
            ]}
        />
    );
});
