import { lazy } from 'react';

export const AboutPageAsync = lazy(
    () => new Promise((resolve) =>
        // @ts-ignore
        // eslint-disable-next-line no-promise-executor-return, implicit-arrow-linebreak
        setTimeout(() => resolve(import('./AboutPage')), 1500)),
);
