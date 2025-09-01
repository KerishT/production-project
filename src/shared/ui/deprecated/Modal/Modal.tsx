import {
    FC,
    ReactNode
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  lazy?: boolean,
  onClose?: () => void
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Modal: FC<ModalProps> = ({
    className, children, isOpen, lazy, onClose
}) => {
    const { isClosing, isMounted, close } = useModal({ isOpen, onClose });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(cls.Modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />

                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
