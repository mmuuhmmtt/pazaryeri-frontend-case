import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { ShoppingCart } from 'lucide-react';

const meta: Meta<typeof Button> = {
    title: 'Atoms/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
    args: {
        children: 'Button',
        variant: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Button',
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Button',
        variant: 'outline',
    },
};

export const WithIcon: Story = {
    args: {
        children: 'Add to Cart',
        leftIcon: <ShoppingCart className="h-5 w-5" />,
    },
};

export const Large: Story = {
    args: {
        children: 'Large Button',
        size: 'lg',
    },
};

export const Small: Story = {
    args: {
        children: 'Small Button',
        size: 'sm',
    },
};
