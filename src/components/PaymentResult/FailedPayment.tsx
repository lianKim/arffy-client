import React, { useCallback } from 'react';
import styled from 'styled-components';
import { AiOutlineCloseCircle } from '@react-icons/all-files/ai/AiOutlineCloseCircle';
import Button from '../@common/atoms/Button/Button';
import { useNavigate } from 'react-router-dom';

interface FailedPaymentProps {
  errorMessage: string | null;
}

export default function FailedPayment({ errorMessage }: FailedPaymentProps) {
  const navigate = useNavigate();
  const handleGoBack = useCallback(() => {
    navigate('/cart', { replace: true });
  }, []);

  return (
    <Container>
      <PaymentResult>
        <StyledErrorIcon />
        <ResultMessage>다시 시도해주시기 바랍니다.</ResultMessage>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </PaymentResult>
      <Button label="장바구니로 이동" onClick={handleGoBack} primary active />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;

  @media screen and (min-width: 1024px) {
    width: 30%;
  }
`;

const PaymentResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const StyledErrorIcon = styled(AiOutlineCloseCircle)`
  font-size: 36px;
  color: var(--color-orange);
`;

const ResultMessage = styled.div`
  margin-top: 16px;
  margin-bottom: 6px;
  font-weight: 500;
  font-size: 13px;
  color: var(--color-orange);
`;

const ErrorMessage = styled.div`
  font-size: var(--font-micro);
  color: var(--color-gray200);
  width: 100%;
  white-space: pre-line;
  line-height: calc(var(--font-small) * 1.3);
  text-align: center;
`;
