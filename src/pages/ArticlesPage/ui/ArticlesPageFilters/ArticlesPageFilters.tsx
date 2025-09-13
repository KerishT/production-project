import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo((props: ArticlesPageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType
    } = useArticleFilters();

    return (
        <VStack
            max
            gap="16"
            className={classNames(cls.ArticlesPageFilters, {}, [className])}
        >
            <HStack
                max
                gap="8"
                justify="between"
                className={cls.sortWrapper}
            >
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeSort={onChangeSort}
                    onChangeOrder={onChangeOrder}
                />

                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </HStack>

            <Card
                className={cls.search}
            >
                <Input
                    placeholder={t('Search')}
                    onChange={onChangeSearch}
                    value={search}
                />
            </Card>

            <ArticleTypeTabs
                value={type}
                onChangeType={onChangeType}
            />

        </VStack>
    );
});
