import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { TextAlign, Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { renderArticleBlock } from './lib/renderArticleBlock';

const RedesignedContent = () => {
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation();

    return (
        <>
            <Text
                title={article?.title}
                size="l"
                bold
            />

            <Text
                title={article?.subtitle}
            />

            <AppImage
                className={cls.img}
                fallback={<SkeletonRedesigned width="100%" height={420} border="16px" />}
                src={article?.img}
                alt={`${t('izobragenie')} ${article?.title}`}
            />

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const DeprecatedContent = () => {
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation();

    return (
        <>
            <HStack justify="center" max className={cls.avatarWrapper}>
                <AvatarDeprecated
                    src={article?.img}
                    alt={`${t('izobragenie')} ${article?.title}`}
                    className={cls.avatar}
                    size={200}
                />
            </HStack>

            <VStack
                max
                gap="4"
                data-testid="ArticleDetails.Info"
            >
                <TextDeprecated
                    title={article?.title}
                    className={cls.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />

                <HStack
                    gap="8"
                    className={cls.articleInfo}
                >
                    <IconDeprecated Svg={SvgIcon} className={cls.icon} />
                    <TextDeprecated text={String(article?.views)} />
                </HStack>

                <HStack
                    gap="8"
                    className={cls.articleInfo}
                >
                    <IconDeprecated Svg={SvgIcon} className={cls.icon} />
                    <TextDeprecated text={article?.createdAt} />
                </HStack>
            </VStack>

            {article?.blocks.map(renderArticleBlock)}
        </>
    );
};

const ArticleDetailsSkeleton = () => {
    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    });

    return (
        <VStack gap="16" max>
            <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
            <Skeleton className={cls.title} width={300} height={32} />
            <Skeleton className={cls.sceleton} width={600} height={24} />
            <Skeleton className={cls.sceleton} width="100%" height={200} />
            <Skeleton className={cls.sceleton} width="100%" height={200} />
        </VStack>
    );
};

interface ArticleDetailsProps {
    className?: string,
    id?: string
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticleById(id));
        }
    }, [dispatch, id]);

    let content;

    if (isLoading) {
        content = <ArticleDetailsSkeleton />;
    } else if (error) {
        content = (
            <TextDeprecated
                title={t('proizoshla-oshibka-pri-zagruzke-statyi')}
                align={TextAlign.CENTER}
            />
        );
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<RedesignedContent />}
                off={<DeprecatedContent />}
            />
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <VStack
                gap="16"
                max
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
