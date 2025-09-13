import {
    memo, MutableRefObject, useRef, UIEvent
} from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, UIActions } from '@/features/UI';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';
import { TestsProps } from '@/shared/types/tests';
import { toggleFeatures } from '@/shared/lib/features';

interface PageProps extends TestsProps {
    className?: string,
    children: React.ReactNode,
    onScrollEnd?: () => void
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getUIScrollByPath(state, pathname)
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => wrapperRef
        }),
        callback: onScrollEnd
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(UIActions.setScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop
        }));
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={
                classNames(
                    toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => cls.PageRedesigned,
                        off: () => cls.Page
                    }),
                    {},
                    [className]
                )
            }
            onScroll={onScroll}
            id={PAGE_ID}
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}

            {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
        </main>
    );
});
