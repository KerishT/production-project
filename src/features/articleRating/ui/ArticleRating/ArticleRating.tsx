import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
    className?: string,
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId
    } = props;
    const { t } = useTranslation();
    const userData = useSelector(getUserAuthData);
    const { data, isLoading } = useArticleRating({ articleId, userId: userData?.id ?? '' });
    const [rateArticleMutation] = useRateArticle();

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                articleId,
                userId: userData?.id ?? '',
                rate: starsCount,
                feedback
            });
        } catch (e) {
            console.log('handleRateArticle:', e);
        }
    }, [articleId, rateArticleMutation, userData?.id]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height={120} />
        );
    }

    const rating = data?.[0];

    return (
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            hasFeedback
            rate={rating?.rate}
            className={className}
            title={`${t('How do you like the article')}?`}
            feedbackTitle={t('Leave a review about the article')}
        />
    );
});

export default ArticleRating;
