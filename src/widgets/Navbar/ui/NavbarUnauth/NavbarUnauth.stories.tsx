import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavbarUnauth } from './NavbarUnauth';

export default {
    title: 'widgets/Navbar/NavbarUnauth',
    component: NavbarUnauth,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof NavbarUnauth>;

const Template: ComponentStory<typeof NavbarUnauth> = (args) => <NavbarUnauth {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
