import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleListItemProps } from '../ArticleListItem';
import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className, article, view, target
    } = props;
    const { t } = useTranslation();

    const title = <Text bold title={article.title} />;
    const subtitle = <Text text={article.subtitle} size="s" />;
    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <HStack gap="8">
            <Icon Svg={SvgIcon} width={12} height={12} />
            <Text text={String(article.views)} className={cls.views} />
        </HStack>
    );
    const createdAt = <Text text={article.createdAt} className={cls.date} />;

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <Card
                max
                padding="24"
                data-testid="ArticleListItem"
                className={classNames('', {}, [className, cls[view]])}
            >
                <VStack max gap="16">
                    <HStack gap="8">
                        <Avatar
                            src={article.user.avatar}
                            size={32}
                            alt={`${t('avatar')} ${article.user.username}`}
                        />

                        <Text bold text={article.user.username} />

                        {createdAt}
                    </HStack>

                    {title}

                    {subtitle}

                    <AppImage
                        src={article.img}
                        alt={article.title}
                        className={cls.img}
                        fallback={<Skeleton width="100%" height={250} />}
                    />

                    {textBlock?.paragraphs && (
                        <Text
                            className={cls.textBlock}
                            text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        />
                    )}

                    <HStack max justify="between">
                        <AppLink
                            to={getRouteArticleDetails(article.id)}
                            target={target}
                        >
                            <Button variant="outline">{t('Read more')}</Button>
                        </AppLink>

                        {views}
                    </HStack>
                </VStack>
            </Card>
        );
    }

    return (
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames('', {}, [className, cls[view]])}
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
