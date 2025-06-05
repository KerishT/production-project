import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Profile } from 'entities/Profile';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { $api } from 'shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
    id: '1',
    first: 'Тимур',
    lastname: 'Ульби',
    age: 22,
    currency: Currency.RUB,
    country: Country.Russia,
    city: 'Moscow',
    username: 'admin'
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile
        },
        user: {
            authData: { id: '1' }
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
};

describe('features/EditableProfileCard', () => {
    test('Режим редакрования должен переключаться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
        expect(screen.getByTestId('EditableProfileCardHeader.SaveButton')).toBeInTheDocument();
    });

    test('При отмене введеные значения должны откатываться', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'Антон');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'Туриста');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Антон');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Туриста');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('Тимур');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('Ульби');
    });

    test('Должна появиться ошибка при сохранении', async () => {
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id="1" />, options);

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'Антон');

        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

        expect(mockPutReq).toHaveBeenCalled();
    });
});
