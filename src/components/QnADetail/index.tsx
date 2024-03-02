import React from 'react';
import QnAForm from './QnAForm';
import styled from 'styled-components';
import { convertDateFormat } from '../../utils/convertDateFormat';
import { useMyQnaDetailData } from '../../lib/apis/qnaAPIs';
import { useNavigate, useParams } from 'react-router-dom';
import ProductInfo from '../@common/organisms/ProductInfo/ProductInfo';
import Button from '../@common/atoms/Button/Button';

export default React.memo(function QnADetail() {
  const navigate = useNavigate();
  const { qnaId } = useParams();
  const [{ data: qnaQuestion }, { data: qnaAnswers }] = useMyQnaDetailData(
    Number(qnaId),
  );

  // 이전 페이지로 이동
  const handleToPrevPage = () => {
    navigate(-1);
  };

  return (
    <>
      {qnaQuestion?.data && (
        <Wrapper>
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
            <QnAForm type="question" info={qnaQuestion.data.qna} />
            {!!qnaAnswers?.data?.length &&
              qnaAnswers.data.map((answer) => (
                <QnAForm
                  type="answer"
                  info={answer}
                  key={answer.qnaCommentId}
                />
              ))}
          </Container>
          <Button label="이전으로" onClick={handleToPrevPage} active />
        </Wrapper>
      )}
    </>
  );
});

const Wrapper = styled.div`
  position: relative;
`;

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
