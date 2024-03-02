import React, { useCallback, useEffect } from 'react';
import Modal from '../@common/molecules/Modal/Modal';
import Input from '../@common/atoms/Input/Input';
import { useAtom } from 'jotai';
import {
  courierNameAtom,
  trackingNumberAtom,
} from '../../store/adminOrderUploadAtom';
import styled from 'styled-components';
import { DELIVERY_COURIERS } from '../../lib/constants/deliveryCouriers';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { toast } from 'react-toastify';
import { TRACKING_NUMBER_REG_EXP } from '../../lib/constants/regExp';
import {
  useTrackingNumberModifyMutation,
  useTrackingNumberUploadMutation,
} from '../../lib/apis/adminOrderAPIs';
import { ObjectIndexable } from '../../@types/common';
import { AdminOrderDeliveryInfo } from '../../@types/adminOrder';

interface TrackingNumberTypingModalProps {
  onCloseModal: () => void;
  ordersId: number;
  ordersDetailId: number;
  deliveryInfo?: AdminOrderDeliveryInfo;
}

export default React.memo(function TrackingNumberTypingModal({
  onCloseModal,
  ordersId,
  ordersDetailId,
  deliveryInfo,
}: TrackingNumberTypingModalProps) {
  const [trackingNumber, setTrackingNumber] = useAtom(trackingNumberAtom);
  const [courierName, setCourierName] = useAtom(courierNameAtom);
  const { mutate: uploadTrackingNumber } = useTrackingNumberUploadMutation();
  const { mutate: modifyTrackingNumber } = useTrackingNumberModifyMutation();

  const handleTrackingNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTrackingNumber(e.target.value);
  };

  const handleCourierNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourierName(e.target.value);
  };

  const validateValues = () => {
    if (!trackingNumber) {
      throw new PropertyRequiredError('운송장번호');
    }

    if (!courierName) {
      throw new PropertyRequiredError('택배사 이름');
    }

    // trackingNumber는 숫자만 입력 가능
    if (!TRACKING_NUMBER_REG_EXP.test(trackingNumber)) {
      throw new ValidationError('운송장번호는 13자리 숫자만 허용됩니다.');
    }

    if (courierName !== '우체국') {
      throw new ValidationError('택배사는 우체국만 지원하고 있습니다.');
    }
  };

  const resetAllValues = useCallback(() => {
    setCourierName('');
    setTrackingNumber('');
  }, []);

  // 운송장 정보 등록 mutation
  const handleUploadButtonClick = () => {
    if (!ordersId || !ordersDetailId) return;

    // 유효성 검사
    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    // 넘겨받은 정보가 있는 경우 수정 / 없는 경우 등록
    if (deliveryInfo) {
      modifyTrackingNumber(
        {
          ordersId,
          ordersDetailId,
          deliveryCarrier: (DELIVERY_COURIERS as ObjectIndexable)[courierName],
          trackingNumber: trackingNumber,
          deliveryId: deliveryInfo.deliveryId,
        },
        {
          onSuccess: () => {
            onCloseModal();
            resetAllValues();
          },
        },
      );
    } else {
      uploadTrackingNumber(
        {
          ordersId,
          ordersDetailId,
          deliveryCarrier: (DELIVERY_COURIERS as ObjectIndexable)[courierName],
          trackingNumber: trackingNumber,
        },
        {
          onSuccess: () => {
            onCloseModal();
            resetAllValues();
          },
        },
      );
    }
  };

  // 수정 시 기존 값 보여주기
  useEffect(() => {
    if (!deliveryInfo) return;

    setCourierName(deliveryInfo.deliveryCarrier);
    setTrackingNumber(deliveryInfo.trackingNumber);
  }, [deliveryInfo]);

  // 언마운트 시 택배사 이름, 운송장 번호 초기화
  useEffect(() => {
    return () => {
      setTimeout(resetAllValues, 1000);
    };
  }, []);

  return (
    <Modal
      onClose={onCloseModal}
      onClickPrimaryButton={handleUploadButtonClick}
    >
      <InputsContainer>
        <Input
          value={courierName}
          onChange={handleCourierNameChange}
          placeholder="Courier Name"
        />
        <Input
          value={trackingNumber}
          onChange={handleTrackingNumberChange}
          placeholder="Tracking Number"
        />
      </InputsContainer>
    </Modal>
  );
});

const InputsContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
`;
