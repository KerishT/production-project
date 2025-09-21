import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticleDetails } from '../../model/selectors/article';
import { useArticleNavigate } from '../../model/hooks/useArticleNavigate';

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const canEdit = useSelector(getCanEditArticleDetails);
    const { onBack, onEdit } = useArticleNavigate();

    return (
        <HStack
            max
            justify="between"
            className={classNames('', {}, [className])}
        >
            <Button
                onClick={onBack}
            >
                {t('Back to list')}
            </Button>

            {canEdit && (
                <Button
                    onClick={onEdit}
                >
                    {t('Edit')}
                </Button>
            )}
        </HStack>
    );
});
