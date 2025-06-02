import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Listbox } from './Listbox';

export default {
    title: 'shared/Listbox',
    component: Listbox,
    argTypes: {
        backgroundColor: { control: 'color' }
    },
    decorators: [
        (Story) => <div style={{ padding: 100 }}><Story /></div>
    ]
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => <Listbox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    value: 'value',
    items: [
        { content: 'content 1', value: 'value 1' },
        { content: 'content 2', value: 'value 2' }
    ]
};

export const topLeft = Template.bind({});
topLeft.args = {
    direction: 'top left',
    value: 'value',
    items: [
        { content: 'content 1', value: 'value 1' },
        { content: 'content 2', value: 'value 2' }
    ]
};

export const topRight = Template.bind({});
topRight.args = {
    direction: 'top right',
    value: 'value',
    items: [
        { content: 'content 1', value: 'value 1' },
        { content: 'content 2', value: 'value 2' }
    ]
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
    direction: 'bottom left',
    value: 'value',
    items: [
        { content: 'content 1', value: 'value 1' },
        { content: 'content 2', value: 'value 2' }
    ]
};

export const bottomRight = Template.bind({});
bottomRight.args = {
    direction: 'bottom right',
    value: 'value',
    items: [
        { content: 'content 1', value: 'value 1' },
        { content: 'content 2', value: 'value 2' }
    ]
};
