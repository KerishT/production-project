import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Listbox } from 'shared/ui/Popups';
import { Currency } from '../../model/types/currency';

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD }
];

interface CurrencySelectProps {
    className?: string,
    value?: Currency,
    readonly?: boolean,
    onChange?: (value: Currency) => void
}

export const CurrencySelect = memo(({
    className, value, readonly, onChange
}: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency);
    }, [onChange]);

    return (
        <Listbox
            className={classNames('', {}, [className])}
            value={value}
            defaultValue={t('ukazhite-valutu')}
            label={t('ukazhite-valutu')}
            onChange={onChangeHandler}
            items={options}
            readonly={readonly}
            direction="top right"
        />
    );
});
