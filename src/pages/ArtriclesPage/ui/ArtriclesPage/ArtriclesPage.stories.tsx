import { ComponentMeta, ComponentStory } from '@storybook/react';
import ArtriclesPage from './ArtriclesPage';

export default {
    title: 'pages/ArtriclesPage',
    component: ArtriclesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArtriclesPage>;

const Template: ComponentStory<typeof ArtriclesPage> = (args) => <ArtriclesPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
