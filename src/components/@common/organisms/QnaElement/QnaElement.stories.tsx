import type { Meta, StoryObj } from '@storybook/react';
import QnaElement from './QnaElement';

const meta = {
  title: 'Organisms/QnaElement',
  component: QnaElement,
  tags: ['autodocs'],
  args: {
    title: '[배송문의]',
    createdAt: '2023-07-04',
  },
} satisfies Meta<typeof QnaElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Answered: Story = {
  args: {
    answered: true,
  },
};

export const Locked: Story = {
  args: {
    locked: true,
  },
};

export const AnsweredAndLocked: Story = {
  args: {
    answered: true,
    locked: true,
  },
};
