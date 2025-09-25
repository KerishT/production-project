import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { LoginModal } from '@/features/AuthByUserName';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NavbarUnauth.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';

interface NavbarUnauthProps {
  className?: string,
  isAuthModal: boolean,
  onShowModal: () => void,
  onCloseModal: () => void
}

export const NavbarUnauth = memo(({
    className,
    isAuthModal,
    onShowModal,
    onCloseModal
}: NavbarUnauthProps) => {
    const { t } = useTranslation();

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <header className={classNames(cls.NavbarRedesigned, {}, [className])}>
                    <Button
                        variant="clear"
                        className={classNames(cls.links)}
                        onClick={onShowModal}
                    >
                        {t('voiti')}
                    </Button>

                    {isAuthModal && (
                        <LoginModal
                            isOpen={isAuthModal}
                            onClose={onCloseModal}
                        />
                    )}
                </header>
            )}
            off={(
                <header className={classNames(cls.Navbar, {}, [className])}>
                    <ButtonDeprecated
                        theme={ButtonTheme.CLEAR_INVERTED}
                        className={classNames(cls.links)}
                        onClick={onShowModal}
                    >
                        {t('voiti')}
                    </ButtonDeprecated>

                    {isAuthModal && (
                        <LoginModal
                            isOpen={isAuthModal}
                            onClose={onCloseModal}
                        />
                    )}
                </header>
            )}
        />
    );
});
