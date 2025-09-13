import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';
import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
    className?: string,
    search: string,
    onChangeSearch: (value: string) => void,
    sort: ArticleSortField,
    order: SortOrder,
    onChangeSort: (newOrder: ArticleSortField) => void,
    onChangeOrder: (newOrder: SortOrder) => void,
    type: ArticleType,
    onChangeType: (type: ArticleType) => void
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
    const {
        className,
        search,
        onChangeSearch,
        sort,
        order,
        onChangeSort,
        onChangeOrder,
        type,
        onChangeType
    } = props;
    const { t } = useTranslation();

    return (
        <Card className={classNames(cls.ArticlesFilters, {}, [className])} padding="24">
            <VStack gap="32">
                <Input
                    placeholder={t('Search')}
                    onChange={onChangeSearch}
                    value={search}
                />

                <ArticleTypeTabs
                    value={type}
                    onChangeType={onChangeType}
                />

                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />
            </VStack>
        </Card>
    );
});
