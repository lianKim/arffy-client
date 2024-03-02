import type { Meta, StoryObj } from '@storybook/react';
import FormFieldContainer from './FormFieldContainer';

const meta = {
  title: 'Molecules/FormFieldContainer',
  component: FormFieldContainer,
  tags: ['autodocs'],
  args: {
    label: 'PRODUCT NAME',
    errorMessage: 'PRODUCT NAME을 입력해주세요',
  },
} satisfies Meta<typeof FormFieldContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <input placeholder="PRODUCT NAME을 입력해주세요" />,
  },
};
