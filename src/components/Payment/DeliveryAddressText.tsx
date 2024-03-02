import React from 'react';
import styled from 'styled-components';

interface DeliveryAddressTextProps {
  name: string;
  mobile: string;
  address: string;
  addressDetail: string;
}

export default React.memo(function DeliveryAddressText({
  name,
  mobile,
  address,
  addressDetail,
}: DeliveryAddressTextProps) {
  return (
    <div>
      <NameAndMobile>
        <span>{name}</span>
        <span>/</span>
        <Mobile>{mobile}</Mobile>
      </NameAndMobile>
      <Address>{`${address} ${addressDetail}`}</Address>
    </div>
  );
});

const NameAndMobile = styled.div`
  & span {
    margin-right: 6px;
  }
`;

const Mobile = styled.span`
  letter-spacing: normal;
`;

const Address = styled.div`
  margin-top: 10px;
  padding-right: calc(var(--font-micro) * 4);
  color: var(--color-gray300);
  line-height: calc(var(--font-micro) * 1.4);
  word-break: keep-all;
`;
