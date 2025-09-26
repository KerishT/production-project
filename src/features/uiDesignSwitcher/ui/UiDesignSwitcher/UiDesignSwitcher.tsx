import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { getFeatureFlag, updateFeatureFlags } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';

interface UiDesignSwitcherProps {
    className?: string
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const forceUpdate = useForceUpdate();

    const items = [
        {
            content: t('Новый'),
            value: 'new'
        },
        {
            content: t('Старый'),
            value: 'old'
        }
    ];

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);

            await dispatch(
                updateFeatureFlags({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new'
                    }
                })
            ).unwrap();

            setIsLoading(false);
            forceUpdate();
        }
    };

    return (
        <HStack gap="8">
            <Text text={t('Interface option')} />

            {isLoading ? (
                <Skeleton width={110} height={36} border="34px" />
            ) : (
                <Listbox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesigned ? 'new' : 'old'}
                    className={className}
                />
            )}
        </HStack>
    );
});
