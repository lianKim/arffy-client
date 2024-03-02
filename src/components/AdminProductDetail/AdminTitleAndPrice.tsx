import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Price from '../@common/molecules/Price/Price';
import Modal from '../@common/molecules/Modal/Modal';
import {
  useProductRestockMutation,
  useProductSoldOutMutation,
} from '../../lib/apis/adminProductAPIs';

interface AdminTitleAndPriceProps {
  title: string;
  price: number;
  discountPrice: number;
  soldOut: boolean;
  productId: number;
}

export default React.memo(function AdminTitleAndPrice({
  title,
  price,
  discountPrice,
  soldOut,
  productId,
}: AdminTitleAndPriceProps) {
  // 품절 처리 재확인 warning 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 상품 품절 처리 useMutation (put)
  const { mutate: makeSoldOut } = useProductSoldOutMutation();
  const { mutate: makeRestock } = useProductRestockMutation();

  // 모달 여는 함수
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // 모달 닫는 함수
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  // 품절 처리/복구 버튼 onClick 함수
  const handleSoldOutButtonClick = useCallback(() => {
    if (soldOut) {
      makeRestock(productId, {
        onSettled: handleModalClose,
      });
    } else {
      makeSoldOut(productId, {
        onSettled: handleModalClose,
      });
    }
  }, [productId, soldOut]);

  return (
    <>
      {modalOpen && (
        <Modal
          onClickPrimaryButton={handleSoldOutButtonClick}
          onClose={handleModalClose}
          primaryButtonText="확인"
          warning
        >
          <div>
            {`정말 ${soldOut ? '품절 복구 처리' : '품절 처리'} 하시겠습니까?`}
          </div>
        </Modal>
      )}
      <Container>
        <ProductName>{title}</ProductName>
        <Price
          price={price}
          discountPrice={discountPrice}
          fontSize="var(--font-micro)"
        />
        <AdminSoldOutButton
          type="button"
          onClick={handleModalOpen}
          soldOut={soldOut}
        >
          {soldOut ? '품절 복구' : '품절 처리'}
        </AdminSoldOutButton>
      </Container>
    </>
  );
});

interface AdminSoldOutButtonProps {
  soldOut: boolean;
}

const Container = styled.div`
  white-space: normal;
  letter-spacing: normal;
`;

const ProductName = styled.h2`
  font-size: var(--font-small);
  line-height: 1.6;
  margin-bottom: 14px;
`;

const AdminSoldOutButton = styled.button<AdminSoldOutButtonProps>`
  background-color: ${(props) =>
    props.soldOut ? 'var(--color-orange)' : 'var(--color-yellow)'};
  color: var(--color-white);
  padding: 2px 3px;
  font-size: var(--font-x-micro);
  line-height: var(--font-micro);
  margin-top: 8px;
  display: inline-block;
  letter-spacing: -0.0625em;
`;
