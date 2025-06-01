import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Listbox } from './Listbox';

export default {
    title: 'shared/Listbox',
    component: Listbox,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof Listbox>;

const Template: ComponentStory<typeof Listbox> = (args) => <Listbox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    defaultValue: 'Change value',
    onChange: () => {},
    value: undefined,
    items: [
        { value: '1', content: 'First' },
        { value: '2', content: 'Second', disabled: true },
        { value: '3', content: 'Third' }
    ]
};
