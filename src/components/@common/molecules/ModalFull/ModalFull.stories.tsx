import type { Meta, StoryObj } from '@storybook/react';
import ModalFull from './ModalFull';

const meta = {
  title: 'Molecules/ModalFull',
  component: ModalFull,
  tags: ['autodocs'],
  args: {
    children: '장바구니에 담겼습니다',
  },
} satisfies Meta<typeof ModalFull>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
