import {
    FC,
    ReactNode
} from 'react';
import { Additional, classNames, Mods } from '@/shared/lib/classNames/classNames';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Overlay } from '../../redesigned/Overlay/Overlay';
import { Portal } from '../../redesigned/Portal/Portal';
import cls from './Modal.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
  className?: string,
  children?: ReactNode,
  isOpen?: boolean,
  lazy?: boolean,
  onClose?: () => void
}

export const Modal: FC<ModalProps> = ({
    className, children, isOpen, lazy, onClose
}) => {
    const { isClosing, isMounted, close } = useModal({ isOpen, onClose });
    const { theme } = useTheme();

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    };

    const aditional: Additional = [
        className,
        theme,
        'app_modal',
        toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld
        })
    ];

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, aditional)}>
                <Overlay onClick={close} />

                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
