import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/storybook.jpg';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        first: 'Тимур',
        lastname: 'Ульби',
        age: 22,
        currency: Currency.EUR,
        country: Country.Russia,
        city: 'Moscow',
        username: 'admin',
        avatar: AvatarImg
    }
};

export const WithError = Template.bind({});
WithError.args = {
    error: 'Error'
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true
};
