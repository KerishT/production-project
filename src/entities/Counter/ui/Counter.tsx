import { FC } from 'react';
import { Button } from '@/shared/ui/Button';
import { useCounterActions } from '../model/slice/counterSlice';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter: FC = () => {
    const counterValue = useCounterValue();
    const { increment, decrement, add } = useCounterActions();

    const handleInc = () => {
        increment();
    };

    const handleDec = () => {
        decrement();
    };

    const handleAddFive = () => {
        add(5);
    };

    return (
        <div data-testid="counter">
            <h1 data-testid="counter_value-title">{counterValue}</h1>

            <Button onClick={handleInc} data-testid="counter_increment-btn">+</Button>
            <Button onClick={handleDec} data-testid="counter_decrement-btn">-</Button>
            <Button onClick={handleAddFive}>+5</Button>
        </div>
    );
};
