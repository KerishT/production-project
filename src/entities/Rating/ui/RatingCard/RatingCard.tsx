import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Drawer } from '@/shared/ui/Drawer';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating';
import { Text } from '@/shared/ui/Text';

interface RatingCardProps {
    className?: string,
    title?: string,
    feedbackTitle?: string,
    hasFeedback?: boolean,
    onCancel?: (starsCount: number) => void,
    onAccept?: (starsCount: number, feedback?: string) => void,
    rate?: number
}

export const RatingCard = memo((props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        rate = 0,
        onCancel,
        onAccept
    } = props;
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsNumber: number) => {
        setStarsCount(selectedStarsNumber);

        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(selectedStarsNumber);
        }
    }, [hasFeedback, onAccept]);

    const onAcceptHandler = useCallback(() => {
        setIsModalOpen(false);

        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const onCancelHandler = useCallback(() => {
        setIsModalOpen(false);

        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />

            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Your feedback')}
            />
        </>

    );

    return (
        <Card
            max
            className={classNames('', {}, [className])}
        >
            <VStack
                gap="8"
                align="center"
            >
                <Text title={starsCount ? `${t('Thank you for your rating')}!` : title} />

                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>

            <BrowserView>
                <Modal
                    lazy
                    isOpen={isModalOpen}
                >
                    <VStack
                        max
                        gap="32"
                    >
                        {modalContent}

                        <HStack
                            max
                            gap="16"
                            justify="end"
                        >
                            <Button
                                onClick={onCancelHandler}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t('Cancel')}
                            </Button>

                            <Button
                                onClick={onAcceptHandler}
                            >
                                {t('Send')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>

            <MobileView>
                <Drawer
                    isOpen={isModalOpen}
                    onClose={onCancelHandler}
                >
                    <VStack
                        gap="32"
                    >
                        {modalContent}

                        <Button
                            onClick={onAcceptHandler}
                            fullWidth
                        >
                            {t('Send')}
                        </Button>
                    </VStack>

                </Drawer>
            </MobileView>
        </Card>
    );
});
