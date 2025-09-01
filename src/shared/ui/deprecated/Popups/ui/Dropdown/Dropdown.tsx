import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    content?: ReactNode,
    href?: string,
    disabled?: boolean,
    onClick?: () => void
}

interface DropdownProps {
    className?: string,
    direction?: DropdownDirection,
    trigger: ReactNode,
    items: DropdownItem[]
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        direction = 'bottom right',
        trigger,
        items
    } = props;

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}
        >
            <Menu.Button
                className={popupCls.trigger}
            >
                {trigger}
            </Menu.Button>

            <Menu.Items
                className={classNames(
                    cls.menu,
                    {},
                    [mapDirectionClass[direction]]
                )}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            className={classNames(
                                cls.item,
                                { [popupCls.active]: active }
                            )}
                            disabled={item.disabled}
                            onClick={item.onClick}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={`dropdown-key-${index}`}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item
                            key={`dropdown-key-${index}`}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
};
