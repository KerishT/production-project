import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Dropdown } from '@/shared/ui/redesigned/Popups';

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

    const items = [
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
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Dropdown
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    trigger={(
                        <Avatar
                            src={authData.avatar}
                            alt={authData.username}
                            size={40}
                        />
                    )}
                    items={items}
                />
            )}
            off={(
                <DropdownDeprecated
                    className={classNames('', {}, [className])}
                    direction="bottom left"
                    trigger={(
                        <AvatarDeprecated
                            fallbackInverted
                            src={authData.avatar}
                            alt={authData.username}
                            size={30}
                        />
                    )}
                    items={items}
                />
            )}
        />
    );
});
