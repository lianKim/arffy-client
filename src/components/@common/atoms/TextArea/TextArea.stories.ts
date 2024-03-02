import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  args: {
    value: '이름을 입력해주세요',
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    status: 'default',
    value: '이름을 입력해주세요',
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
