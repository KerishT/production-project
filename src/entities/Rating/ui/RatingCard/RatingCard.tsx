import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <>
                    <Text title={feedbackTitle} />

                    <Input
                        id="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="RatingCard.Input"
                        placeholder={t('Your feedback')}
                    />
                </>
            )}
            off={(
                <>
                    <TextDeprecated title={feedbackTitle} />

                    <InputDeprecated
                        value={feedback}
                        onChange={setFeedback}
                        data-testid="RatingCard.Input"
                        placeholder={t('Your feedback')}
                    />
                </>
            )}
        />
    );

    const content = (
        <>
            <VStack
                gap="8"
                align="center"
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={(
                        <Text
                            title={starsCount ? `${t('Thank you for your rating')}!` : title}
                        />
                    )}
                    off={(
                        <TextDeprecated
                            title={starsCount ? `${t('Thank you for your rating')}!` : title}
                        />
                    )}
                />

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

                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={(
                                <HStack max gap="16" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={onCancelHandler}
                                    >
                                        {t('Cancel')}
                                    </Button>

                                    <Button
                                        data-testid="RatingCard.Send"
                                        onClick={onAcceptHandler}
                                    >
                                        {t('Send')}
                                    </Button>
                                </HStack>
                            )}
                            off={(
                                <HStack max gap="16" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        onClick={onCancelHandler}
                                        theme={ButtonTheme.OUTLINE_RED}
                                    >
                                        {t('Cancel')}
                                    </ButtonDeprecated>

                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        onClick={onAcceptHandler}
                                    >
                                        {t('Send')}
                                    </ButtonDeprecated>
                                </HStack>
                            )}
                        />
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

                        <ToggleFeatures
                            feature="isAppRedesigned"
                            on={(
                                <Button
                                    fullWidth
                                    data-testid="RatingCard.Send"
                                    onClick={onAcceptHandler}
                                    size="l"
                                >
                                    {t('Send')}
                                </Button>
                            )}
                            off={(
                                <ButtonDeprecated
                                    fullWidth
                                    data-testid="RatingCard.Send"
                                    onClick={onAcceptHandler}
                                    size={ButtonSize.L}
                                >
                                    {t('Send')}
                                </ButtonDeprecated>
                            )}
                        />
                    </VStack>
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card
                    max
                    data-testid="RatingCard"
                    padding="24"
                    border="round"
                    className={classNames('', {}, [className])}
                >
                    {content}
                </Card>
            )}
            off={(
                <CardDeprecated
                    max
                    data-testid="RatingCard"
                    className={classNames('', {}, [className])}
                >
                    {content}
                </CardDeprecated>
            )}
        />
    );
});
