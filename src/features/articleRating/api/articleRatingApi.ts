import { Rating } from '@/entities/Rating';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetArticleRatingArgs {
    userId: string,
    articleId: string
}

interface RateArticleArgs extends GetArticleRatingArgs {
    rate: number,
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingArgs>({
            query: ({ userId, articleId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId
                }
            })
        }),
        rateArticle: build.mutation<void, RateArticleArgs>({
            query: (args) => ({
                url: '/article-ratings',
                method: 'POST',
                body: args
            })
        })
    })
});

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
