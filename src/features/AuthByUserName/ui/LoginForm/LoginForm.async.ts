import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () => new Promise((resolve) =>
        // @ts-ignore
        // eslint-disable-next-line no-promise-executor-return, implicit-arrow-linebreak
        setTimeout(() => resolve(import('./LoginForm')), 1500)),
);
