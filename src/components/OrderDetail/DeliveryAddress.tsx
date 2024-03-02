import React from 'react';
import DeliveryAddressText from '../Payment/DeliveryAddressText';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import styled from 'styled-components';

interface DeliveryAddressProps {
  name: string;
  mobile: string;
  address: string;
  addressDetail: string;
  deliveryRequest?: string;
}

export default React.memo(function DeliveryAddress({
  name,
  mobile,
  address,
  addressDetail,
  deliveryRequest,
}: DeliveryAddressProps) {
  return (
    <CollapsibleContainer
      label="배송지"
      preview={`${address} ${addressDetail}`}
    >
      <DeliveryAddressText
        name={name}
        mobile={mobile}
        address={address}
        addressDetail={addressDetail}
      />
      <DeliveryRequest>
        배송요청사항 : {deliveryRequest || '없음'}
      </DeliveryRequest>
    </CollapsibleContainer>
  );
});

const DeliveryRequest = styled.div`
  margin-top: 18px;
`;
