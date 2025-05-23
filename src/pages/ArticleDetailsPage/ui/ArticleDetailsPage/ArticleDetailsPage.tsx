import { ArticleDetails, ArticleList } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddCommentForm';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleDetailsComments } from '../../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsRecomendations } from '../../model/slice/articleDetailsRecommendationsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleDetailsComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendations = useSelector(getArticleDetailsRecomendations.selectAll);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));

        dispatch(fetchArticleRecommendations());
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                { t('statya-ne-naidena')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Button onClick={onBackToList}>
                    {t('Back to list')}
                </Button>

                <ArticleDetails id={id} />

                <Text
                    size={TextSize.L}
                    title={t('Recommended')}
                    className={cls.recommendationsTitle}
                />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    className={cls.recommendations}
                    target="_blank"
                />

                <Text
                    size={TextSize.L}
                    title={t('kommentarii')}
                    className={cls.commentsTitle}
                />
                <AddCommentForm onSendComment={onSendComment} />

                <CommentList
                    comments={comments}
                    isLoading={commentsIsLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
