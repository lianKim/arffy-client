import React from 'react';
import styled from 'styled-components';
import { convertDateFormat } from '../../utils/convertDateFormat';
import QnAForm from '../QnADetail/QnAForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminQnaDetailData } from '../../lib/apis/adminQnaAPIs';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import ButtonsPair from '../@common/molecules/ButtonsPair/ButtonsPair';

interface AdminQnADetailProps {
  isCommentPage?: boolean;
}

export default React.memo(function AdminQnADetail({
  isCommentPage,
}: AdminQnADetailProps) {
  const navigate = useNavigate();

  const { qnaId } = useParams();
  const [{ data: qnaQuestion }, { data: qnaAnswers }] = useAdminQnaDetailData(
    Number(qnaId),
  );

  const handleCommentButtonClick = () => {
    navigate('comment');
  };

  return (
    <>
      {!!qnaQuestion?.data && (
        <>
          <Container>
            <QnATitleContainer>
              <QnATitle>{qnaQuestion.data.qna.title}</QnATitle>
              <QnADate>
                {convertDateFormat(qnaQuestion.data.qna.createdAt)}
              </QnADate>
            </QnATitleContainer>
            {qnaQuestion.data.product && (
              <>
                <ProductInfoWrapper>
                  <ProductInfo
                    thumbnail={qnaQuestion.data.product.thumbnail}
                    productName={qnaQuestion.data.product.productName}
                    price={qnaQuestion.data.product.price}
                    discountPrice={qnaQuestion.data.product.discountPrice}
                  />
                </ProductInfoWrapper>
                <Division />
              </>
            )}
            <QnAForm type="question" info={qnaQuestion.data.qna} admin />
            {!!qnaAnswers?.data?.length &&
              qnaAnswers.data.map((answer) => (
                <QnAForm
                  type="answer"
                  info={answer}
                  key={answer.qnaCommentId}
                  admin
                />
              ))}
          </Container>
          {!isCommentPage && (
            <ButtonsPair
              primaryButtonText="답변하기"
              secondaryButtonText="이전으로"
              onClickPrimaryButton={handleCommentButtonClick}
              active
            />
          )}
        </>
      )}
    </>
  );
});

const Container = styled.div`
  border: 1px solid var(--color-gray100);
  margin-bottom: 32px;
`;

const QnATitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid var(--color-gray100);
`;

const QnATitle = styled.span`
  font-weight: 500;
`;

const QnADate = styled.span`
  color: var(--color-gray200);
  letter-spacing: normal;
  font-size: var(--font-x-micro);
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray100);
`;

const ProductInfoWrapper = styled.div`
  padding: 12px;
`;
