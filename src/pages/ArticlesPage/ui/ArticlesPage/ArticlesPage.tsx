import { memo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slices/ArticlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import cls from './ArticlesPage.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    content={(
                        <Page
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames(cls.ArtriclesPage, {}, [className])}
                        >
                            <VStack
                                max
                                gap="32"
                            >
                                <ArticleInfiniteList />

                                <ArticlePageGreeting />
                            </VStack>

                        </Page>
                    )}
                    right={<FiltersContainer />}
                />
            )}
            off={(
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.ArtriclesPage, {}, [className])}
                >
                    <VStack
                        max
                        gap="32"
                    >
                        <ArticlesPageFilters />

                        <ArticleInfiniteList />

                        <ArticlePageGreeting />
                    </VStack>

                </Page>
            )}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
