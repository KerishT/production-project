import { memo } from 'react';
import { ArticleView } from '@/entities/Article';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import cls from './ArticleViewSelector.module.scss';
import { HStack } from '@/shared/ui/deprecated/Stack';

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
        <HStack
            gap="8"
            className={classNames(cls.ArticleViewSelector, {}, [className])}
        >
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                        Svg={viewType.icon}
                        width={14}
                        height={14}
                    />
                </Button>
            ))}
        </HStack>
    );
});
