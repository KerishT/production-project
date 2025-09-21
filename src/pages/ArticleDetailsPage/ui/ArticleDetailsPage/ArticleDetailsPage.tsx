import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import cls from './ArticleDetailsPage.module.scss';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { t } = useTranslation();
    const { className } = props;
    const { id } = useParams<{id: string}>();

    if (!id) {
        return null;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <StickyContentLayout
                        content={(
                            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                                <VStack gap="16" max>
                                    <DetailsContainer />

                                    <ArticleRating articleId={id} />

                                    <ArticleRecommendationsList />

                                    <ArticleDetailsComments id={id} />
                                </VStack>
                            </Page>
                        )}
                        right={<AdditionalInfoContainer />}
                    />
                )}
                off={(
                    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                        <VStack gap="16" max>
                            <ArticleDetailsPageHeader />

                            <ArticleDetails id={id} />

                            <ToggleFeatures
                                feature="isArticleRatingEnabled"
                                on={<ArticleRating articleId={id} />}
                                off={<Card>{t('Article rating will appear soon')}</Card>}
                            />

                            <ArticleRecommendationsList />

                            <ArticleDetailsComments id={id} />
                        </VStack>
                    </Page>
                )}
            />

        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
