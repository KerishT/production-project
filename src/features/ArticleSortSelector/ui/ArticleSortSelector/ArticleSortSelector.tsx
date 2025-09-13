import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { Select as SelectDeprecated, SelectOprions } from '@/shared/ui/deprecated/Select';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import cls from './ArticleSortSelector.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleSortSelectorProps {
    className?: string,
    sort: ArticleSortField,
    order: SortOrder,
    onChangeSort: (newOrder: ArticleSortField) => void,
    onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        sort, order, onChangeSort, onChangeOrder, className
    } = props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOprions<SortOrder>[]>(() => ([
        {
            value: 'asc',
            content: t('ascending')
        },
        {
            value: 'desc',
            content: t('descending')
        }
    ]), [t]);

    const sortFieldOptions = useMemo<SelectOprions<ArticleSortField>[]>(() => ([
        {
            value: ArticleSortField.CREATED,
            content: t('date of creation')
        },
        {
            value: ArticleSortField.TITLE,
            content: t('title')
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('views')
        }
    ]), [t]);

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <VStack gap="8" className={classNames(cls.ArticleSortSelectorRedesigned, {}, [className])}>
                    <Text text={`${t('Sort by')}:`} />

                    <Listbox
                        items={sortFieldOptions}
                        onChange={onChangeSort}
                        value={sort}
                    />

                    <Listbox
                        items={orderOptions}
                        onChange={onChangeOrder}
                        value={order}
                    />
                </VStack>
            )}
            off={(
                <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
                    <SelectDeprecated
                        options={sortFieldOptions}
                        onChange={onChangeSort}
                        value={sort}
                        label={t('Sort by')}
                    />

                    <SelectDeprecated
                        className={cls.order}
                        options={orderOptions}
                        onChange={onChangeOrder}
                        value={order}
                        label={t('by')}
                    />
                </div>
            )}
        />
    );
});
