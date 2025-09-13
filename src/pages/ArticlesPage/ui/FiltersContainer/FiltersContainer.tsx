import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/hooks/useArticleFilters';
import { classNames } from '@/shared/lib/classNames/classNames';

interface FiltersContainerProps {
    className?: string
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        sort,
        order,
        search,
        type,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType
    } = useArticleFilters();

    return (
        <ArticlesFilters
            className={classNames('', {}, [className])}
            search={search}
            sort={sort}
            order={order}
            type={type}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
        />
    );
});
