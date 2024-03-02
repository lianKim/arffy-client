import React from 'react';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import TotalPaymentAmount from '../@common/organisms/TotalPaymentAmount/TotalPaymentAmount';
import { insertCommas } from '../../utils/handleCommas';

interface PaymentAmountProps {
  totalPrice: number;
  totalDiscountedPrice: number;
  isPaid?: boolean;
}

export default React.memo(function PaymentAmount({
  totalPrice,
  totalDiscountedPrice,
  isPaid,
}: PaymentAmountProps) {
  return (
    <CollapsibleContainer
      label="결제금액"
      preview={`KRW ${insertCommas(totalDiscountedPrice)}`}
    >
      <TotalPaymentAmount
        totalPrice={totalPrice}
        totalDiscountedPrice={totalDiscountedPrice}
        isPaid={isPaid}
      />
    </CollapsibleContainer>
  );
});
