import type { Meta, StoryObj } from '@storybook/react';
import CollapsibleContainer from './CollapsibleContainer';

const meta = {
  title: 'Molecules/CollapsibleContainer',
  component: CollapsibleContainer,
  tags: ['autodocs'],
  args: {
    label: 'PRODUCT NAME',
    preview: '1960s Meblo Guzzini Pendant Lamp',
  },
} satisfies Meta<typeof CollapsibleContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>1960s Meblo Guzzini Pendant Lamp</div>,
  },
};
