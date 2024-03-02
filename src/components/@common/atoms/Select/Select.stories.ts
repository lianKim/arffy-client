import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    label: 'Q&A 유형을 선택해주세요',
    options: ['[상품문의]', '[배송문의]', '[기타문의]'],
    value: '선택값',
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'default',
  },
};

export const Focus: Story = {
  args: {
    status: 'focus',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
  },
};
