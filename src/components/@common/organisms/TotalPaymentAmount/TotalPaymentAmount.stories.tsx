import type { Meta, StoryObj } from '@storybook/react';
import TotalPaymentAmount from './TotalPaymentAmount';

const meta = {
  title: 'Organisms/TotalPaymentAmount',
  component: TotalPaymentAmount,
  tags: ['autodocs'],
} satisfies Meta<typeof TotalPaymentAmount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPrice: 240000,
    totalDiscountedPrice: 120000,
  },
};
