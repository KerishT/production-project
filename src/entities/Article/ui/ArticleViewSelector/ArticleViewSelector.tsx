import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import SvgIcon from '@/shared/assets/icons/svg-icon.svg';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import { ArticleView } from '../../model/consts/articleConsts';
import cls from './ArticleViewSelector.module.scss';

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
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        className={classNames('', { [cls.notSelected]: viewType.view !== view }, [])}
                        Svg={viewType.icon}
                    />
                </Button>
            ))}
        </div>
    );
});
