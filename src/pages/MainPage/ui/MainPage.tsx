import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Text } from '@/shared/ui/redesigned/Text';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <Page
            data-testid="MainPage"
        >
            <Text title={t('Главная')} />
        </Page>
    );
};

export default MainPage;
