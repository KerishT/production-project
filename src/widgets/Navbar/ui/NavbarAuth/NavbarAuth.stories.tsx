import { ComponentMeta, ComponentStory } from '@storybook/react';
import { NavbarAuth } from './NavbarAuth';

export default {
    title: 'widgets/Navbar/NavbarAuth',
    component: NavbarAuth,
    argTypes: {
        backgroundColor: { control: 'color' }
    }
} as ComponentMeta<typeof NavbarAuth>;

const Template: ComponentStory<typeof NavbarAuth> = (args) => <NavbarAuth {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
