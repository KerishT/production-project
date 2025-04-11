import { screen } from '@testing-library/react';
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { userEvent } from '@storybook/testing-library';
import { Counter } from './Counter';

describe('Counter', () => {
    test('Test render', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        expect(screen.getByTestId('counter_value-title')).toHaveTextContent('10');
    });

    test('Increment', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        userEvent.click(screen.getByTestId('counter_increment-btn'));
        expect(screen.getByTestId('counter_value-title')).toHaveTextContent('11');
    });

    test('Decrement', () => {
        componentRender(<Counter />, { initialState: { counter: { value: 10 } } });
        userEvent.click(screen.getByTestId('counter_decrement-btn'));
        expect(screen.getByTestId('counter_value-title')).toHaveTextContent('9');
    });
});
