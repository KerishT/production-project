import { lazy } from 'react';

export const ArtriclesPageAsync = lazy(
    () => new Promise((resolve) =>
        // @ts-ignore
        // eslint-disable-next-line no-promise-executor-return, implicit-arrow-linebreak
        setTimeout(() => resolve(import('./ArtriclesPage')), 1500)),
);
