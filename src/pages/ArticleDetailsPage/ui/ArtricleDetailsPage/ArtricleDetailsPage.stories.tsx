import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArtricleDetailsPage from './ArtricleDetailsPage';

export default {
    title: 'pages/ArtricleDetailsPage',
    component: ArtricleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArtricleDetailsPage>;

const Template: ComponentStory<typeof ArtricleDetailsPage> = (args) => <ArtricleDetailsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
