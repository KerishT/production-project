import {
    memo, useCallback, useState
} from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { NavbarAuth } from './NavbarAuth/NavbarAuth';
import { NavbarUnauth } from './NavbarUnauth/NavbarUnauth';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    if (authData) {
        return <NavbarAuth className={className} />;
    }

    return (
        <NavbarUnauth
            className={className}
            isAuthModal={isAuthModal}
            onShowModal={onShowModal}
            onCloseModal={onCloseModal}
        />
    );
});
