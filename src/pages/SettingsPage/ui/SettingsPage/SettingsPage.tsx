import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

const SettingsPage = () => {
    const { t } = useTranslation();

    return (
        <Page>
            <VStack gap="16">
                <Text title={t('User settings')} />

                <UiDesignSwitcher />
            </VStack>
        </Page>
    );
};

export default SettingsPage;
