import React, { SetStateAction, useCallback } from 'react';
import styled from 'styled-components';
import Modal from '../../molecules/Modal/Modal';
import { useDeleteAccountMutation } from '../../../../lib/apis/signInAPIs';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

interface AccountDeleteConfirmModalProps {
  onCloseModal: React.Dispatch<SetStateAction<boolean>>;
}

export default React.memo(function AccountDeleteConfirmModal({
  onCloseModal,
}: AccountDeleteConfirmModalProps) {
  const { mutate: deleteAccount } = useDeleteAccountMutation();

  const handleModalClose = useCallback(() => {
    onCloseModal(false);
  }, []);

  const handleAccountDelete = useCallback(() => {
    deleteAccount(undefined, {
      onSettled: handleModalClose,
      onSuccess: () => {
        localStorage.removeItem('accessToken');
        return (window.location.href = `${VITE_CLIENT_BASE_URL}/product`);
      },
    });
  }, []);

  return (
    <Modal
      primaryButtonText="취소"
      secondaryButtonText="탈퇴"
      onClickPrimaryButton={handleModalClose}
      onClickSecondaryButton={handleAccountDelete}
      onClose={onCloseModal}
      warning
    >
      <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
      <ParagraphsContainer>
        <p>
          불편하셨던 점을 알려주시면 적극 반영해서 고객님의 불편함을 해결해
          드리도록 노력하겠습니다.
        </p>
        <WarmingMessage>
          회원 탈퇴 시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래
          등에서의 소비자 보호에 관한 법률에 의거한 고객정보 보호정책에 따라
          관리됩니다.
        </WarmingMessage>
      </ParagraphsContainer>
    </Modal>
  );
});

const ModalTitle = styled.div`
  font-weight: 500;
`;

const ParagraphsContainer = styled.div`
  color: var(--color-gray300);
  line-height: calc(var(--font-x-micro) * 1.5);
  font-size: var(--font-x-micro);
  margin-top: 32px;
`;

const WarmingMessage = styled.p`
  color: var(--color-orange);
  margin-top: 12px;
`;
