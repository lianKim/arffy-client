import type { Meta, StoryObj } from '@storybook/react';
import SoldOutMark from './SoldOutMark';

const meta = {
  title: 'Atoms/SoldOutMark',
  component: SoldOutMark,
  tags: ['autodocs'],
} satisfies Meta<typeof SoldOutMark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoMargin: Story = {
  args: {
    noMargin: true,
  },
};
