import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Icon
                    Svg={NotificationIcon}
                    width={18}
                    height={18}
                    clicable
                    onClick={onOpenDrawer}
                />
            )}
            off={(
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={ButtonTheme.CLEAR}
                >
                    <IconDeprecated
                        Svg={NotificationIcon}
                        inverted
                        width={16}
                        height={16}
                    />
                </ButtonDeprecated>
            )}
        />
    );

    return (
        <div
            className={classNames(cls.NotificationButton, {}, [className])}
        >
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={(
                        <Popover
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList
                                className={cls.notifications}
                            />
                        </Popover>
                    )}
                    off={(
                        <PopoverDeprecated
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList
                                className={cls.notifications}
                            />
                        </PopoverDeprecated>
                    )}
                />
            </BrowserView>

            <MobileView>
                {trigger}

                <Drawer
                    isOpen={isOpen}
                    onClose={onCloseDrawer}
                >
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    );
});
