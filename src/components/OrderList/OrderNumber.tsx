import React, { useEffect } from 'react';
import DividerShort from '../@common/atoms/DividerShort/DividerShort';
import styled from 'styled-components';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { Link } from 'react-router-dom';

interface OrderNumberProps {
  merchantUid: string;
}

export default React.memo(function OrderNumber({
  merchantUid,
}: OrderNumberProps) {
  return (
    <div>
      <DividerShort />
      <OrderNumberContainer>
        <MerchantUid>{merchantUid}</MerchantUid>
        <StyledChevronIcon />
      </OrderNumberContainer>
    </div>
  );
});

const OrderNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
`;

const MerchantUid = styled.div`
  font-weight: var(--weight-semi-bold);
  letter-spacing: normal;
`;

const StyledChevronIcon = styled(FiChevronRight)`
  color: var(--color-gray300);
  font-size: var(--font-medium);
`;
