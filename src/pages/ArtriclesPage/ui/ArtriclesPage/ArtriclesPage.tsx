import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArtriclesPage.module.scss';

interface ArtriclesPageProps {
    className?: string
}

const ArtriclesPage = (props: ArtriclesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.ArtriclesPage, {}, [className])}>
            {t('articles-page')}
        </div>
    );
};

export default memo(ArtriclesPage);
