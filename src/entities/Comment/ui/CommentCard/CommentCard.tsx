import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string,
    comment?: Comment,
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation();

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated
    });

    if (isLoading) {
        return (
            <VStack
                max
                gap="8"
                data-testid="CommentCard.Loading"
                className={classNames(cls.CommentCard, {}, [className, cls.loading])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />

                    <Skeleton className={cls.username} width={150} height={16} />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card padding="24" border="round" max>
                    <VStack
                        max
                        gap="8"
                        data-testid="CommentCard.Content"
                        className={classNames(cls.CommentCardRedesigned, {}, [className])}
                    >
                        <AppLink to={getRouteProfile(comment?.user.id)}>
                            <HStack gap="8">
                                {comment?.user.avatar && (
                                    <Avatar
                                        size={30}
                                        src={comment?.user.avatar}
                                        alt={`${t('avatar')} ${comment?.user.username}`}
                                    />
                                )}

                                <Text className={cls.username} bold text={comment?.user.username} />
                            </HStack>
                        </AppLink>

                        <Text className={cls.text} text={comment?.text} />
                    </VStack>
                </Card>
            )}
            off={(
                <VStack
                    max
                    gap="8"
                    data-testid="CommentCard.Content"
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <AppLinkDeprecated to={getRouteProfile(comment?.user.id)} className={cls.header}>
                        {comment?.user.avatar && (
                            <AvatarDeprecated
                                size={30}
                                src={comment?.user.avatar}
                                alt={`${t('avatar')} ${comment?.user.username}`}
                            />
                        )}

                        <TextDeprecated className={cls.username} text={comment?.user.username} />
                    </AppLinkDeprecated>

                    <TextDeprecated className={cls.text} text={comment?.text} />
                </VStack>
            )}
        />
    );
});
