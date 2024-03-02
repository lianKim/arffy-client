import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Modal from '../@common/molecules/Modal/Modal';
import { useQnAQuestionDeleteMutation } from '../../lib/apis/qnaAPIs';
import { QnaAnswer, QnaQuestion } from '../../@types/qna';
import { useQnAAnswerDeleteMutation } from '../../lib/apis/adminQnaAPIs';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

interface QnAFormProps {
  type: 'question' | 'answer';
  info: QnaQuestion | QnaAnswer;
  admin?: boolean;
}

export default React.memo(function QnAForm({
  type,
  info,
  admin,
}: QnAFormProps) {
  // 삭제 재확인 warning 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { mutate: deleteAnswer } = useQnAAnswerDeleteMutation();
  const { mutate: deleteQuestion } = useQnAQuestionDeleteMutation();

  // 모달 여는 함수
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // 모달 닫는 함수
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  // 질문/답변 삭제
  const handleDeleteButtonClick = useCallback(() => {
    if (admin && info.qnaCommentId) {
      deleteAnswer(
        {
          qnaId: info.qnaId,
          qnaCommentId: info.qnaCommentId,
        },
        {
          onSuccess: () => {
            handleModalClose();
            return window.location.reload();
          },
        },
      );
    } else {
      deleteQuestion(info.qnaId, {
        onSettled: () => {
          handleModalClose();
        },
        onSuccess: () =>
          (window.location.href = `${VITE_CLIENT_BASE_URL}/my/qna`),
      });
    }
  }, [info.qnaId, info.qnaCommentId]);

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
      <Container className={type === 'question' ? 'no-border' : ''}>
        <QnAMark>{type === 'question' ? 'Q.' : 'A.'}</QnAMark>
        {((admin && type === 'answer') || (!admin && type === 'question')) && (
          <DeleteButton type="button" onClick={handleModalOpen}>
            삭제
          </DeleteButton>
        )}
        <Content>{info.content}</Content>
        {!!info.imageList?.length &&
          info.imageList.map((image) => (
            <ImageContainer key={image.imageId}>
              <img src={image.imageUrl} alt="Q&A image" />
            </ImageContainer>
          ))}
      </Container>
    </>
  );
});
const Container = styled.div`
  padding: 16px 12px;
  border-top: 1px solid var(--color-gray100);
  position: relative;

  &.no-border {
    border-top: 0;
  }
`;

const QnAMark = styled.div`
  font-weight: var(--weight-bold);
  font-size: var(--font-regular);
  margin-bottom: 24px;
  letter-spacing: normal;
`;

const Content = styled.p`
  margin-bottom: 40px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 16px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 1024px) {
    width: 50vh;
  }
`;

const DeleteButton = styled.button`
  color: var(--color-gray200);
  position: absolute;
  top: 16px;
  right: 12px;
  font-weight: 500;
`;
