import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';

const meta = {
  title: 'Organisms/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    thumbnail:
      'https://arffy-bucket.s3.ap-northeast-2.amazonaws.com/product/01b20a48-9a1e-442a-88e4-610da62be5e7_1686147274865.jpeg',

    productName:
      '1970s Harvey Guzzini Space Age White Pendant Lamp by Luigi Massoni',
    price: 130000,
    discountPrice: 100000,
    productId: 27,
  },
};

export const SoldOut: Story = {
  args: {
    thumbnail:
      'https://arffy-bucket.s3.ap-northeast-2.amazonaws.com/product/01b20a48-9a1e-442a-88e4-610da62be5e7_1686147274865.jpeg',

    productName:
      '1970s Harvey Guzzini Space Age White Pendant Lamp by Luigi Massoni',
    price: 130000,
    discountPrice: 100000,
    productId: 27,
    soldOut: true,
  },
};
