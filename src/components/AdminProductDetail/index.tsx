import React, { useCallback, useState } from 'react';
import Description from '../ProductDetail/Description';
import Details from '../ProductDetail/Details';
import AdminTitleAndPrice from './AdminTitleAndPrice';
import { useNavigate, useParams } from 'react-router-dom';
import AdminProductImageCarousel from './AdminProductImageCarousel';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';
import Modal from '../@common/molecules/Modal/Modal';
import AdminProductQnAList from './AdminProductQnAList';
import {
  useAdminProductDetailData,
  useProductDeleteMutation,
} from '../../lib/apis/adminProductAPIs';
import styled from 'styled-components';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default React.memo(function AdminProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  // 품절 처리 재확인 warning 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { data: productInfo } = useAdminProductDetailData(Number(productId));
  const { mutate: deleteProduct } = useProductDeleteMutation();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleDeleteButtonClick = useCallback(() => {
    if (!productInfo?.data) return;

    deleteProduct(productInfo.data.productId, {
      onSuccess: () => {
        handleModalClose();
        return window.location.replace(`${VITE_CLIENT_BASE_URL}/admin/product`);
      },
      onError: () => {
        handleModalClose();
      },
    });
  }, [productInfo?.data.productId]);

  const handleModifyButtonClick = useCallback(() => {
    if (!productInfo?.data) return;

    navigate(`/admin/product/modify?id=${productInfo.data.productId}`);
  }, [productInfo?.data.productId]);

  return (
    <>
      {modalOpen && (
        <Modal
          onClickPrimaryButton={handleDeleteButtonClick}
          onClose={handleModalClose}
          primaryButtonText="확인"
          warning
        >
          <div>정말 삭제하시겠습니까?</div>
        </Modal>
      )}
      {!!productInfo?.data && (
        <>
          <Container>
            <AdminProductImageCarousel
              imageInfoList={productInfo.data.imageList}
            />
            <ContentContainer>
              <ContentDetailsContainer>
                <AdminTitleAndPrice
                  productId={productInfo.data.productId}
                  title={productInfo.data.productName}
                  price={productInfo.data.price}
                  discountPrice={productInfo.data.discountPrice}
                  soldOut={productInfo.data.quantity < 1}
                />
                <Description description={productInfo.data.description} />
                <Details
                  period={productInfo.data.period}
                  country={productInfo.data.country}
                  width={productInfo.data.width}
                  depth={productInfo.data.depth}
                  height={productInfo.data.height}
                  minLineHeight={productInfo.data.minLineHeight}
                  maxLineHeight={productInfo.data.maxLineHeight}
                  material={productInfo.data.material}
                  condition={productInfo.data.condition}
                />
              </ContentDetailsContainer>
              <ButtonsPairContainer>
                <ButtonsPair
                  primaryButtonText="수정"
                  secondaryButtonText="삭제"
                  onClickPrimaryButton={handleModifyButtonClick}
                  onClickSecondaryButton={handleModalOpen}
                  active={true}
                />
              </ButtonsPairContainer>
            </ContentContainer>
          </Container>
          <AdminProductQnAList productId={productInfo.data.productId} />
        </>
      )}
    </>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    height: calc(100vh - 128px - 64px);
    gap: 40px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    width: calc(90vw - ((100vh - 128px - 64px) * 0.66666667));
    height: 100%;
  }
`;

const ContentDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8vh;

  @media screen and (min-width: 1024px) {
    height: calc(100% - 37px - 48px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
      border-radius: 16px;
      background-color: var(--color-white);
    }

    &::-webkit-scrollbar:hover {
      background-color: var(--color-orange);
    }

    &::-webkit-scrollbar-thumb {
      width: 10px;
      background-color: var(--color-gray100);
      border-radius: 16px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-yellow);
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

const ButtonsPairContainer = styled.div`
  margin-top: 48px;
`;
