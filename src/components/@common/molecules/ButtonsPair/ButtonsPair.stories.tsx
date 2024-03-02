import type { Meta, StoryObj } from '@storybook/react';
import ButtonsPair from './ButtonsPair';

const meta = {
  title: 'Molecules/ButtonsPair',
  component: ButtonsPair,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof ButtonsPair>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    active: false,
  },
};
