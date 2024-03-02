import type { Meta, StoryObj } from '@storybook/react';
import ImageCarousel from './ImageCarousel';

const meta = {
  title: 'Organisms/ImageCarousel',
  component: ImageCarousel,
  tags: ['autodocs'],
  args: {
    children: (
      <div style={{ width: '90vw' }}>
        <img
          style={{
            width: '90vw',
            height: 'calc(90vw * 1.5)',
            objectFit: 'cover',
          }}
          src="https://arffy-bucket.s3.ap-northeast-2.amazonaws.com/product/01b20a48-9a1e-442a-88e4-610da62be5e7_1686147274865.jpeg"
        />
      </div>
    ),
  },
} satisfies Meta<typeof ImageCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomSize: Story = {
  args: {
    width: '200px',
    pcWidth: '30vw',
  },
};
