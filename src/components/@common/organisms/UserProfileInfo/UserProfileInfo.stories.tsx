import type { Meta, StoryObj } from '@storybook/react';
import UserProfileInfo from './UserProfileInfo';

const meta = {
  title: 'Organisms/UserProfileInfo',
  component: UserProfileInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof UserProfileInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: {
      value: 'Jane Doe',
      errorMessage: '',
    },
    mobile: {
      value: '01090334563',
      errorMessage: '휴대폰번호를 입력해주세요',
    },
    postcode: {
      value: '03308',
    },
    address: {
      value: '서울시 어쩌고 저쩌고 무슨동',
      errorMessage: '',
    },
    addressDetail: {
      value: '204호',
      errorMessage: '상세주소를 입력해주세요',
    },
  },
};
