import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { useArticleRecommendationList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data: articles, isLoading, isError } = useArticleRecommendationList(4);

    if (isLoading || isError || !articles) {
        return null;
    }

    return (
        <VStack
            gap="8"
            data-testid="ArticleRecommendationsList"
            className={classNames('', {}, [className])}
        >
            <ToggleFeatures
                feature="isAppRedesigned"
                on={(
                    <Text
                        size="l"
                        title={t('Recommended')}
                    />
                )}
                off={(
                    <TextDeprecated
                        size={TextSize.L}
                        title={t('Recommended')}
                    />
                )}
            />

            <ArticleList
                isLoading={isLoading}
                articles={articles}
                target="_blank"
            />
        </VStack>
    );
});
