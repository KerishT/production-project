import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileSchema } from 'features/editableProfileCard';
import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

const profileData: ProfileSchema = {
    form: {
        first: 'Тимур',
        lastname: 'Ульби',
        age: 22,
        currency: Currency.EUR,
        country: Country.Russia,
        city: 'Moscow',
        username: 'admin'
    },
    isLoading: false,
    readonly: true
};

export const Normal = Template.bind({});
Normal.decorators = [StoreDecorator({
    profile: profileData
})];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
    profile: profileData
})];
