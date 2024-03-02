import React from 'react';
import CompletedPayment from './CompletedPayment';
import FailedPayment from './FailedPayment';
import { useSearchParams } from 'react-router-dom';

export default function PaymentResult() {
  const [searchParams, setSearchParams] = useSearchParams();
  const merchantUid = searchParams.get('merchant_uid');
  const success = searchParams.get('imp_success');
  const errorMessage = searchParams.get('error_msg');

  return (
    <>
      {success === 'true'
        ? !!merchantUid && <CompletedPayment merchantUid={merchantUid} />
        : !!errorMessage && <FailedPayment errorMessage={errorMessage} />}
    </>
  );
}
