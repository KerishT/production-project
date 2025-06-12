import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const data = {
            first: 'Тимур',
            lastname: 'Ульби',
            age: 22,
            currency: Currency.EUR,
            country: Country.Russia,
            city: 'Moscow',
            username: 'admin'
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data
            }
        };

        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getProfileForm(state as StateSchema)).toBeUndefined();
    });
});
