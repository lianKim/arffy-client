import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Button',
  },
  argTypes: {
    label: {
      name: 'label',
      type: { name: 'string', required: true },
      defaultValue: 'Button',
    },
    primary: { type: 'boolean' },
    active: { type: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const ActivePrimary: Story = {
  args: {
    primary: true,
    active: true,
  },
};

export const Secondary: Story = {
  args: {},
};

export const ActiveSecondary: Story = {
  args: {
    active: true,
  },
};
