import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArtricleDetailsPage.module.scss';

interface ArtricleDetailsPageProps {
    className?: string
}

const ArtricleDetailsPage = (props: ArtricleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArtricleDetailsPage, {}, [className])}>
            {t('article-details')}
        </div>
    );
};

export default memo(ArtricleDetailsPage);
