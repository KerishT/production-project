import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/deprecated/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/deprecated/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { Drawer } from '@/shared/ui/deprecated/Drawer';

interface ArticlePageGreetingProps {
    className?: string
}

export const ArticlePageGreeting = memo((props: ArticlePageGreetingProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();

    const onClose = () => setIsOpen(false);

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);

            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [isArticlesPageWasOpened, dispatch]);

    const text = (
        <Text
            title={t('Welcome to the articles page')}
            text={t('Here you can search and view articles on various topics')}
        />
    );

    if (isMobile) {
        <Drawer
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
        >
            {text}
        </Drawer>;
    }

    return (
        <Modal
            lazy
            isOpen={isOpen}
            onClose={onClose}
            className={classNames('', {}, [className])}
        >
            {text}
        </Modal>
    );
});
