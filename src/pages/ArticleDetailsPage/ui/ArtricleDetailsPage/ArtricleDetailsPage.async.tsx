import { lazy } from 'react';

export const ArtricleDetailsPageAsync = lazy(
    () => new Promise((resolve) =>
        // @ts-ignore
        // eslint-disable-next-line no-promise-executor-return, implicit-arrow-linebreak
        setTimeout(() => resolve(import('./ArtricleDetailsPage')), 1500)),
);
