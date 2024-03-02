import type { Meta, StoryObj } from '@storybook/react';
import ProductInfo from './ProductInfo';
import Button from '../../atoms/Button/Button';

const meta = {
  title: 'Organisms/ProductInfo',
  component: ProductInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof ProductInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    productName:
      '1970s Harvey Guzzini Space Age White Pendant Lamp by Luigi Massoni',
    price: 130000,
    discountPrice: 100000,
    thumbnail:
      'https://arffy-bucket.s3.ap-northeast-2.amazonaws.com/product/01b20a48-9a1e-442a-88e4-610da62be5e7_1686147274865.jpeg',
  },
};

export const WithChildren: Story = {
  args: {
    productName:
      '1970s Harvey Guzzini Space Age White Pendant Lamp by Luigi Massoni',
    price: 130000,
    discountPrice: 100000,
    thumbnail:
      'https://arffy-bucket.s3.ap-northeast-2.amazonaws.com/product/01b20a48-9a1e-442a-88e4-610da62be5e7_1686147274865.jpeg',
    children: <Button label="운송장번호 입력" active={true} primary={true} />,
  },
};
