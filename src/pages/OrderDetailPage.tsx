import React, { useEffect } from 'react';
import OrderDetail from '../components/OrderDetail';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { merchantUidAtom, ordersIdAtom } from '../store/orderDetailAtom';

export default function OrderDetailPage() {
  const params = useParams();
  const [ordersId, setOrdersId] = useAtom(ordersIdAtom);
  const [merchantUid, setMerchantUid] = useAtom(merchantUidAtom);

  useEffect(() => {
    const { ordersId, merchantUid } = params;
    if (!ordersId || !merchantUid) return;

    setOrdersId(ordersId);
    setMerchantUid(merchantUid);
  }, [params]);

  return <>{!!ordersId && !!merchantUid && <OrderDetail />}</>;
}
