import type { Meta, StoryObj } from '@storybook/react';
import Price from './Price';

const meta = {
  title: 'Molecules/Price',
  component: Price,
  tags: ['autodocs'],
  args: {
    price: 200000,
  },
} satisfies Meta<typeof Price>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    discountPrice: 130000,
  },
};

export const NoDiscount: Story = {
  args: {
    discountPrice: 200000,
  },
};

export const VerticalCenter: Story = {
  args: {
    discountPrice: 130000,
    verticalCenter: true,
  },
};
