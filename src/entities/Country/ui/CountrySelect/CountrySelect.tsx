import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Listbox as ListboxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Country } from '../../model/types/country';
import { ToggleFeatures } from '@/shared/lib/features';

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void,
    readonly?: boolean
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
    { value: Country.Ukraine, content: Country.Ukraine }
];

export const CountrySelect = memo(({
    className, value, onChange, readonly
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Listbox
                    className={classNames('', {}, [className])}
                    value={value}
                    defaultValue={t('Country')}
                    label={`${t('Country')}:`}
                    onChange={onChangeHandler}
                    items={options}
                    readonly={readonly}
                    direction="top right"
                />
            )}
            off={(
                <ListboxDeprecated
                    className={classNames('', {}, [className])}
                    value={value}
                    defaultValue={t('ukazhite-stranu')}
                    label={t('ukazhite-stranu')}
                    onChange={onChangeHandler}
                    items={options}
                    readonly={readonly}
                    direction="top right"
                />
            )}
        />
    );
});
