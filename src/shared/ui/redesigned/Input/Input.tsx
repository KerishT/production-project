import {
    ChangeEvent,
    InputHTMLAttributes,
    memo,
    ReactNode,
    useEffect,
    useRef,
    useState
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string,
    id: string,
    value?: string | number,
    placeholder?: string,
    autofocus?: boolean,
    readonly?: boolean,
    addonLeft?: ReactNode,
    addonRight?: ReactNode,
    onChange?: (value: string) => void,
    validate?: (value: string) => boolean
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        validate,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);

    const onChangeHanlder = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        if (!validate || validate(value)) {
            onChange?.(value);
        }
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight)
    };

    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>
            {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}

            <input
                ref={ref}
                className={cls.input}
                type={type}
                value={value}
                onChange={onChangeHanlder}
                onBlur={onBlur}
                onFocus={onFocus}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />

            {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
        </div>
    );
});
