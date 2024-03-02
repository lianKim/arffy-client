import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  refundableMerchantUidAtom,
  refundableOrdersIdAtom,
} from '../store/adminOrderDetailAtom';
import AdminOrderRefund from '../components/AdminOrderRefund';

export default function AdminOrderRefundPage() {
  const params = useParams();
  const [ordersId, setOrdersId] = useAtom(refundableOrdersIdAtom);
  const [merchantUid, setMerchantUid] = useAtom(refundableMerchantUidAtom);

  useEffect(() => {
    const { ordersId, merchantUid } = params;
    if (!ordersId || !merchantUid) return;

    setOrdersId(Number(ordersId));
    setMerchantUid(merchantUid);
  }, [params?.ordersId]);

  useEffect(() => {
    return () => {
      setOrdersId(0);
      setMerchantUid('');
    };
  }, []);

  return (
    <>
      {!!ordersId && !!merchantUid && (
        <AdminOrderRefund ordersId={ordersId} merchantUid={merchantUid} />
      )}
    </>
  );
}
