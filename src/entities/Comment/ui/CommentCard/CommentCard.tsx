import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { getRouteProfile } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
    className?: string,
    comment?: Comment,
    isLoading?: boolean
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;
    const { t } = useTranslation();

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
        <VStack
            max
            gap="8"
            data-testid="CommentCard.Content"
            className={classNames(cls.CommentCard, {}, [className])}
        >
            <AppLink to={getRouteProfile(comment?.user.id)} className={cls.header}>
                {comment?.user.avatar && (
                    <Avatar
                        size={30}
                        src={comment?.user.avatar}
                        alt={`${t('avatar')} ${comment?.user.username}`}
                    />
                )}

                <Text className={cls.username} text={comment?.user.username} />
            </AppLink>

            <Text className={cls.text} text={comment?.text} />
        </VStack>
    );
});
