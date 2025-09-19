import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletoRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { useNotifications } from '../../api/notitficationApi';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
    className?: string
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, { pollingInterval: 10000 });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletoRedesigned,
        off: () => SkeletonDeprecated
    });

    if (isLoading) {
        return (
            <VStack
                max
                gap="16"
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8%" height="88px" />

                <Skeleton width="100%" border="8%" height="88px" />

                <Skeleton width="100%" border="8%" height="88px" />
            </VStack>
        );
    }

    return (
        <VStack
            max
            gap="16"
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                />
            ))}
        </VStack>
    );
});
