import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleNavigate } from '../../model/hooks/useArticleNavigate';

interface AdditionalInfoContainerProps {
    className?: string
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
    const { className } = props;
    const article = useSelector(getArticleDetailsData);
    const { onEdit } = useArticleNavigate();

    if (!article) {
        return null;
    }

    return (
        <Card
            padding="24"
            border="round"
            className={classNames(cls.AdditionalInfoContainer, {}, [className])}
        >
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
                onEdit={onEdit}
            />
        </Card>
    );
});
