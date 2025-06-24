import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types';
import { Select, SelectOprions } from '@/shared/ui/Select';
import cls from './ArticleSortSelector.module.scss';

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
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                options={sortFieldOptions}
                onChange={onChangeSort}
                value={sort}
                label={t('Sort by')}
            />

            <Select
                className={cls.order}
                options={orderOptions}
                onChange={onChangeOrder}
                value={order}
                label={t('by')}
            />
        </div>
    );
});
