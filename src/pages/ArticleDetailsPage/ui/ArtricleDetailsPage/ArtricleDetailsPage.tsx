import { ArticleDetails } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArtricleDetailsPage.module.scss';

interface ArtricleDetailsPageProps {
    className?: string
}

const ArtricleDetailsPage = (props: ArtricleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div className={classNames(cls.ArtricleDetailsPage, {}, [className])}>
                { t('statya-ne-naidena')}
            </div>
        );
    }

    return (
        <div className={classNames(cls.ArtricleDetailsPage, {}, [className])}>
            <ArticleDetails id={id} />
        </div>
    );
};

export default memo(ArtricleDetailsPage);
