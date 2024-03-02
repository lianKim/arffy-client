import { Meta, StoryObj } from '@storybook/react';
import SubCategoryBox from './SubCategoryBox';

const meta = {
  title: 'Molecules/SubCategoryBox',
  component: SubCategoryBox,
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof SubCategoryBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    categoryList: ['All', 'In Stock', 'Out of Stock'],
    currentCategory: 'All',
  },
};
