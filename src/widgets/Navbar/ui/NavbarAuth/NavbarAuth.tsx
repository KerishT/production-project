import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextTheme } from '@/shared/ui/Text';
import { AvatarDropdown } from '@/features/avatarDropdown';
import { NotificationButton } from '@/features/notificationButton';
import { getRouteArticleCreate } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavbarAuth.module.scss';

interface NavbarAuthProps {
  className?: string
}

export const NavbarAuth = memo(({ className }: NavbarAuthProps) => {
    const { t } = useTranslation();

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <HStack
                        gap="16"
                        className={cls.actions}
                    >
                        <NotificationButton />
                        <AvatarDropdown />
                    </HStack>
                </header>
            )}
            off={(
                <header className={classNames(cls.Navbar, {}, [className])}>
                    <Text
                        className={cls.appName}
                        title={t('Ulbi TV App')}
                        theme={TextTheme.INVERTED}
                    />

                    <AppLink
                        to={getRouteArticleCreate()}
                        theme={AppLinkTheme.SECONDARY}
                    >
                        {t('Create article')}
                    </AppLink>

                    <HStack
                        gap="16"
                        className={cls.actions}
                    >
                        <NotificationButton />
                        <AvatarDropdown />
                    </HStack>
                </header>
            )}
        />
    );
});
