import { FC } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Loader.module.scss';

interface LoaderProps {
  className?: string
}

/**
 * Outdated, use new components from redesigned folder
 * @deprecated
 */
export const Loader: FC<LoaderProps> = ({ className }) => <div className={classNames(cls.Loader, {}, [className])} />;
