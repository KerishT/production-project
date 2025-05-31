import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOprions<T extends string> {
    value: T,
    content: string
}

interface SelectProps<T extends string> {
    className?: string,
    label?: string,
    options?: SelectOprions<T>[],
    value?: T,
    disabled?: boolean,
    onChange?: (value: T) => void
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        value,
        disabled,
        onChange,
    } = props;

    const optionsList = useMemo(() => options?.map((opt) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
    };

    const mods: Mods = {
        [cls.disabled]: disabled,
    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}

            <select
                value={value}
                onChange={onChangeHandler}
                disabled={disabled}
                className={cls.select}
            >
                {optionsList}
            </select>
        </div>
    );
};
