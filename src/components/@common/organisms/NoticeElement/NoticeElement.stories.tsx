import type { Meta, StoryObj } from '@storybook/react';
import NoticeElement from './NoticeElement';

const meta = {
  title: 'Organisms/NoticeElement',
  component: NoticeElement,
  tags: ['autodocs'],
  args: {
    title: '공지사항입니다.',
    createdAt: '2023-06-13',
  },
} satisfies Meta<typeof NoticeElement>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TopFixed: Story = {
  args: {
    topFixed: true,
  },
};
