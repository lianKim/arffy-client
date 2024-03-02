import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';

const meta = {
  title: 'Molecules/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    children: '장바구니에 담겼습니다',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryButtonText: '계속 쇼핑하기',
    secondaryButtonText: '장바구니 이동',
  },
};

export const WithSingleButton: Story = {
  args: {
    primaryButtonText: '장바구니 이동',
    singleButton: true,
  },
};
