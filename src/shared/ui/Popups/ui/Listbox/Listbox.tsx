import { Fragment, ReactNode } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownDirection } from 'shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import cls from './Listbox.module.scss';

export interface ListboxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean
}

interface ListboxProps {
    className?: string,
    items?: ListboxItem[],
    value?: string,
    defaultValue?: string,
    readonly?: boolean,
    direction?: DropdownDirection,
    label?: string,
    onChange: (value: string) => void
}

export const Listbox = (props: ListboxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        readonly,
        onChange,
        direction = 'bottom right',
        label
    } = props;

    return (
        <HStack gap="4">
            {label && <span className={cls.label}>{`${label} >`}</span>}

            <HListbox
                as="div"
                className={classNames(cls.Listbox, {}, [className, popupCls.popup])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >

                <HListbox.Button
                    className={cls.trigger}
                >
                    <Button
                        disabled={readonly}
                    >
                        {value ?? defaultValue}
                    </Button>
                </HListbox.Button>

                <HListbox.Options
                    className={classNames(cls.options, {}, [mapDirectionClass[direction]])}
                >
                    {items?.map((item) => (
                        <HListbox.Option
                            key={item.value}
                            as={Fragment}
                            value={item.value}
                            disabled={item.disabled}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled
                                        },
                                        []
                                    )}
                                >
                                    {selected && '✓ '}
                                    {item.content}
                                </li>
                            )}
                        </HListbox.Option>
                    ))}
                </HListbox.Options>
            </HListbox>
        </HStack>
    );
};
