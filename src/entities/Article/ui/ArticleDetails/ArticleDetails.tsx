import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynammicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated, TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { renderArticleBlock } from './lib/renderArticleBlock';
import cls from './ArticleDetails.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

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
                fallback={<Skeleton width="100%" height={420} border="16px" />}
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
        content = (
            <>
                <SkeletonDeprecated className={cls.avatar} width={200} height={200} border="50%" />
                <SkeletonDeprecated className={cls.title} width={300} height={32} />
                <SkeletonDeprecated className={cls.sceleton} width={600} height={24} />
                <SkeletonDeprecated className={cls.sceleton} width="100%" height={200} />
                <SkeletonDeprecated className={cls.sceleton} width="100%" height={200} />
            </>
        );
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
