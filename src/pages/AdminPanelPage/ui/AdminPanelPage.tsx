import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';

const AdminPanelPage = () => {
    const { t } = useTranslation();

    return (
        <Page
            data-testid="AdminPanelPage"
        >

            <Text title={t('Admin panel')} />
        </Page>
    );
};

export default AdminPanelPage;
