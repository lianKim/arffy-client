import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../@common/molecules/Modal/Modal';

interface AddedToCartModalProps {
  onCloseModal: () => void;
}

export default React.memo(function AddedToCartModal({
  onCloseModal,
}: AddedToCartModalProps) {
  const navigate = useNavigate();

  const handleGoToCartClick = useCallback(() => {
    navigate('/cart');
  }, []);

  const handleKeepShoppingClick = useCallback(() => {
    onCloseModal();
  }, []);

  return (
    <Modal
      primaryButtonText="계속 쇼핑하기"
      secondaryButtonText="장바구니 이동"
      onClickSecondaryButton={handleGoToCartClick}
      onClickPrimaryButton={handleKeepShoppingClick}
      onClose={onCloseModal}
    >
      <div>장바구니에 담겼습니다</div>
    </Modal>
  );
});
