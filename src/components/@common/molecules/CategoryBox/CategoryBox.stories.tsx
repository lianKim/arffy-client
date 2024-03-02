import { Meta, StoryObj } from '@storybook/react';
import CategoryBox from './CategoryBox';

const meta = {
  title: 'Molecules/CategoryBox',
  component: CategoryBox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof CategoryBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryList: ['All', 'Pendant', 'Table', 'Wall', 'Etc'],
    currentCategory: 'All',
  },
};
