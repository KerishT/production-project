import { Fragment, ReactNode, useMemo } from 'react';
import { Listbox as HListbox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../../redesigned/Stack';
import { mapDirectionClass } from '../../styles/consts';
import popupCls from '../../styles/popup.module.scss';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import cls from './Listbox.module.scss';
import { Icon } from '../../../Icon';

export interface ListboxItem<T extends string> {
    value: T,
    content: ReactNode,
    disabled?: boolean
}

interface ListboxProps<T extends string> {
    className?: string,
    items?: ListboxItem<T>[],
    value?: T,
    defaultValue?: string,
    readonly?: boolean,
    direction?: DropdownDirection,
    label?: string,
    onChange: (value: T) => void
}

export function Listbox<T extends string>(props: ListboxProps<T>) {
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

    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value]
    );

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
                    as="div"
                >
                    <Button
                        variant="filled"
                        disabled={readonly}
                        addonRight={<Icon Svg={SvgIcon} width={12} height={12} />}
                    >
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListbox.Button>

                <HListbox.Options
                    className={classNames(
                        cls.options,
                        {},
                        [mapDirectionClass[direction], popupCls.menu]
                    )}
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
                                            [popupCls.disabled]: item.disabled,
                                            [cls.selected]: selected
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
}
