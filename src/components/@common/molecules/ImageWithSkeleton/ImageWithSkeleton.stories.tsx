import type { Meta, StoryObj } from '@storybook/react';
import ImageWithSkeleton from './ImageWithSkeleton';

const meta = {
  title: 'Molecules/ImageWithSkeleton',
  component: ImageWithSkeleton,
  tags: ['autodocs'],
  args: {
    src: '',
  },
} satisfies Meta<typeof ImageWithSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
