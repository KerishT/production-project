import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Button } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { ArticleView, ArticleBlockType } from '../../model/consts/articleConsts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import cls from './ArticleListItem.module.scss';
import { AppImage } from '@/shared/ui/deprecated/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';

interface ArticleListItemProps {
    className?: string,
    article: Article,
    view: ArticleView,
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className, article, view, target
    } = props;
    const { t } = useTranslation();

    const title = <Text text={article.title} className={cls.title} />;
    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={SvgIcon} width={12} height={12} />
        </>
    );
    const createdAt = <Text text={article.createdAt} className={cls.date} />;

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <div
                data-testid="ArticleListItem"
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar
                            src={article.user.avatar}
                            size={30}
                            alt={`${t('avatar')} ${article.user.username}`}
                        />

                        <Text text={article.user.username} className={cls.username} />

                        {createdAt}
                    </div>

                    {title}

                    {types}

                    <AppImage
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                        fallback={<Skeleton width="100%" height={250} />}
                    />

                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}

                    <div className={cls.footer}>
                        <AppLink
                            to={getRouteArticleDetails(article.id)}
                            target={target}
                        >
                            <Button>{t('Read more')}</Button>
                        </AppLink>

                        {views}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                        fallback={<Skeleton width={200} height={200} />}
                    />

                    {createdAt}
                </div>

                <div className={cls.infoWrapper}>
                    {types}

                    {views}
                </div>

                {title}
            </Card>
        </AppLink>
    );
});
