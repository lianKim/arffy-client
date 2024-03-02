import { useAtom } from 'jotai';
import React from 'react';
import {
  deliveryRequestContentAtom,
  deliveryRequestErrorMessageAtom,
} from '../../store/paymentAtom';
import FormFieldContainer from '../@common/molecules/FormFieldContainer/FormFieldContainer';
import Input from '../@common/atoms/Input/Input';

export default React.memo(function DeliveryRequestInput() {
  const [deliveryRequest, setDeliveryRequest] = useAtom(
    deliveryRequestContentAtom,
  );
  const [deliveryRequestErrorMessage, setDeliveryRequestErrorMessage] = useAtom(
    deliveryRequestErrorMessageAtom,
  );

  const handleDeliveryRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const trimmedValue = value.trim();
    setDeliveryRequest(value);

    // falsy 값일 경우 에러 메세지

    if (trimmedValue.length > 50) {
      setDeliveryRequestErrorMessage('50자 이내로 입력해주세요');
    } else {
      setDeliveryRequestErrorMessage('');
    }
  };

  return (
    <FormFieldContainer label="DELIVERY REQUEST">
      <Input
        placeholder="배송요청사항이 있을 시 입력해주세요"
        value={deliveryRequest}
        onChange={handleDeliveryRequest}
        hasError={!!deliveryRequestErrorMessage}
      />
    </FormFieldContainer>
  );
});
