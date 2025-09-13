import { memo } from 'react';
import { ArticleView } from '@/entities/Article';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';

interface ArticleViewSelectorProps {
    className?: string,
    view: ArticleView,
    onViewClick: (view: ArticleView) => void
}

const viewTypes = [
    {
        view: ArticleView.SMALL,
        icon: SvgIcon
    },
    {
        view: ArticleView.BIG,
        icon: SvgIcon
    }
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={(
                <Card className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])} border="round">
                    <HStack gap="8">
                        {viewTypes.map((viewType, idx) => (
                            <Icon
                                key={idx}
                                className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                                Svg={viewType.icon}
                                onClick={onClick(viewType.view)}
                                clicable
                                width={14}
                                height={14}
                            />
                        ))}
                    </HStack>
                </Card>
            )}
            off={(
                <HStack
                    gap="8"
                    className={classNames(cls.ArticleViewSelector, {}, [className])}
                >
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            theme={ButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                            key={viewType.view}
                        >
                            <IconDeprecated
                                className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                                Svg={viewType.icon}
                                width={14}
                                height={14}
                            />
                        </ButtonDeprecated>
                    ))}
                </HStack>
            )}
        />
    );
});
