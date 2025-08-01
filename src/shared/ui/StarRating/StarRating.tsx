import { memo, useState } from 'react';
import StarIcon from '@/shared/assets/icons/star-icon.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '../Icon/Icon';
import cls from './StarRating.module.scss';

const stars = [1, 2, 3, 4, 5];

interface StarRatingProps {
    className?: string,
    size?: number,
    selectedStars?: number,
    onSelect?: (starsCount: number) => void
}

export const StarRating = memo((props: StarRatingProps) => {
    const {
        className, size = 30, selectedStars = 0, onSelect
    } = props;
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);

            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    key={starNumber}
                    Svg={StarIcon}
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    width={size}
                    height={size}
                    onMouseEnter={onHover(starNumber)}
                    onMouseLeave={onLeave}
                    onClick={onClick(starNumber)}
                    data-testid={`StarRating.${starNumber}`}
                    data-selected={currentStarsCount >= starNumber}
                />
            ))}
        </div>
    );
});
