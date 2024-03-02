import React, { useState } from 'react';
import styled from 'styled-components';
import { BiPencil } from '@react-icons/all-files/bi/BiPencil';
import TrackingNumberTypingModal from './TrackingNumberTypingModal';
import { AdminOrderDeliveryInfo } from '../../@types/adminOrder';

interface AdminDeliveryStatusProps {
  ordersId: number;
  ordersDetailId: number;
  deliveryInfo?: AdminOrderDeliveryInfo;
}

export default React.memo(function AdminDeliveryStatus({
  ordersId,
  ordersDetailId,
  deliveryInfo,
}: AdminDeliveryStatusProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <TrackingNumberTypingModal
          ordersId={ordersId}
          ordersDetailId={ordersDetailId}
          deliveryInfo={deliveryInfo}
          onCloseModal={closeModal}
        />
      )}
      <div>
        <Status>{deliveryInfo?.deliveryStatus || '배송준비중'}</Status>
        {deliveryInfo ? (
          <DeliveryInfoContainer>
            <CourierName>{deliveryInfo.deliveryCarrier}</CourierName>
            <TrackingNumberLink
              href={`https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=${deliveryInfo.trackingNumber}&displayHeader=N`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {deliveryInfo.trackingNumber}
            </TrackingNumberLink>
            <ModifyingTrackingNumberButton type="button" onClick={openModal}>
              <StyledModifyingIcon />
            </ModifyingTrackingNumberButton>
          </DeliveryInfoContainer>
        ) : (
          <TypingTrackingNumberButton type="button" onClick={openModal}>
            운송장번호 입력
          </TypingTrackingNumberButton>
        )}
      </div>
    </>
  );
});

const Status = styled.div`
  font-weight: 500;
`;

const DeliveryInfoContainer = styled.div`
  display: flex;
  align-items: flex-end;
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

const TypingTrackingNumberButton = styled.button`
  font-size: var(--font-x-micro);
  font-weight: 500;
  background-color: var(--color-navy);
  color: var(--color-white);
  height: 22px;
  padding: 0 calc(var(--font-micro) / 2);
  margin-top: 8px;
`;

const ModifyingTrackingNumberButton = styled.button`
  margin-left: 4px;
  padding: 0 2px;
  width: 14px;
  height: 14px;
`;

const StyledModifyingIcon = styled(BiPencil)`
  color: var(--color-gray400);
  width: 14px;
  height: 14px;
  position: relative;
  bottom: -1px;
`;
