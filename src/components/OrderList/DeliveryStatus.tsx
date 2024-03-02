import React from 'react';
import styled from 'styled-components';
import { DeliveryInfo } from '../../@types/order';

interface DeliveryProps {
  deliveryInfo?: DeliveryInfo;
}

export default React.memo(function DeliveryStatus({
  deliveryInfo,
}: DeliveryProps) {
  return (
    <div>
      <Status>{deliveryInfo?.deliveryStatus || '배송준비중'}</Status>
      {deliveryInfo && (
        <DeliveryInfoContainer>
          <CourierName>{deliveryInfo.deliveryCarrier}</CourierName>
          <TrackingNumberLink
            href={`https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=${deliveryInfo.trackingNumber}&displayHeader=N`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {deliveryInfo.trackingNumber}
          </TrackingNumberLink>
        </DeliveryInfoContainer>
      )}
    </div>
  );
});

const Status = styled.div`
  font-weight: 500;
`;

const DeliveryInfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const CourierName = styled.span`
  color: var(--color-gray300);
`;

const TrackingNumberLink = styled.a`
  padding-bottom: 1px;
  margin-left: 4px;
  text-decoration: underline;
`;
