import { ChangeEvent, memo, useMemo } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOprions {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: string
    options?: SelectOprions[]
    value?: string
    disabled?: boolean
    onChange?: (value: string) => void
}

export const Select = memo((props: SelectProps) => {
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
        onChange?.(e.target.value);
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
});
