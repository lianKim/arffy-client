import type { Meta, StoryObj } from '@storybook/react';
import PageTitle from './PageTitle';

const meta = {
  title: 'Atoms/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Korean: Story = {
  args: {
    title: '주문배송조회',
  },
};

export const English: Story = {
  args: {
    title: 'Notice',
  },
};
