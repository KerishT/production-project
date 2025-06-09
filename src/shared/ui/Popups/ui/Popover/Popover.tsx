import { Popover as HPopover } from '@headlessui/react';
import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './Popover.module.scss';

interface PopoverProps {
    className?: string,
    direction?: DropdownDirection,
    trigger: ReactNode,
    children: ReactNode
}

export const Popover = memo((props: PopoverProps) => {
    const {
        className,
        direction = 'bottom right',
        trigger,
        children
    } = props;

    return (
        <HPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HPopover.Button className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(
                    cls.panel,
                    {},
                    [mapDirectionClass[direction]]
                )}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
