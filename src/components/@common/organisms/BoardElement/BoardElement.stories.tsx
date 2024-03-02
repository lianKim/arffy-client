import type { Meta, StoryObj } from '@storybook/react';
import BoardElement from './BoardElement';

const meta = {
  title: 'Organisms/BoardElement',
  component: BoardElement,
  tags: ['autodocs'],
  args: {
    createdAt: '2023-06-13',
  },
} satisfies Meta<typeof BoardElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Notice: Story = {
  args: {
    title: '공지사항입니다.',
  },
};

export const NoticeTopFixed: Story = {
  args: {
    title: '공지사항입니다.',
    topFixed: true,
  },
};

export const Qna: Story = {
  args: {
    title: '[배송문의]',
  },
};

export const QnaAnswered: Story = {
  args: {
    title: '[배송문의]',
    answered: true,
  },
};
