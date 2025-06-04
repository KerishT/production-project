import { ArticleList } from 'entities/Article';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../model/selectors/articlesPageSelector';
import { getArticles } from '../../model/slices/ArticlesPageSlice';

export const ArticleInfiniteList = memo(() => {
    const articles = useSelector(getArticles.selectAll);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const isLoading = useSelector(getArticlesPageIsLoading);

    if (error) {
        return null;
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
        />
    );
});
