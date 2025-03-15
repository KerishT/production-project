/* eslint-disable i18next/no-literal-string */
import { LoginModal } from 'features/AuthByUserName';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={ButtonTheme.CLEAR_INVERTED} className={classNames(cls.links)} onClick={onShowModal}>
                {t('voiti')}
            </Button>

            <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
        </div>
    );
};
