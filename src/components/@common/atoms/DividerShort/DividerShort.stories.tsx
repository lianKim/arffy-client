import type { Meta, StoryObj } from '@storybook/react';
import DividerShort from './DividerShort';

const meta = {
  title: 'Atoms/DividerShort',
  component: DividerShort,
  tags: ['autodocs'],
} satisfies Meta<typeof DividerShort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoMarginBottom: Story = {
  args: {
    noMarginBottom: true,
  },
};
