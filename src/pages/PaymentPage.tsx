import React, { useEffect } from 'react';
import Payment from '../components/Payment';
import { useAtom } from 'jotai';
import {
  merchantUidAtom,
  ordersIdAtom,
  paymentAmountAtom,
} from '../store/paymentAtom';
import { useLocation } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const data = location.state?.datas;

  const [ordersId, setOrdersId] = useAtom(ordersIdAtom);
  const [merchantUid, setMerchantUid] = useAtom(merchantUidAtom);
  const [paymentAmount, setPaymentAmount] = useAtom(paymentAmountAtom);

  // 값 초기화 함수
  const resetValues = () => {
    setOrdersId(0);
    setMerchantUid('');
    setPaymentAmount(0);
  };

  useEffect(() => {
    if (!data) return;

    setOrdersId(data.ordersId);
    setMerchantUid(data.merchant_uid);
    setPaymentAmount(data.amount);
  }, [data]);

  useEffect(() => {
    return () => {
      setTimeout(resetValues, 1000);
    };
  }, []);

  return <>{!!ordersId && <Payment />}</>;
}
