import React, { useEffect } from 'react';
import AdminOrderDetail from '../components/AdminOrderDetail';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { merchantUidAtom, ordersIdAtom } from '../store/adminOrderDetailAtom';

export default function AdminOrderDetailPage() {
  const params = useParams();

  const [ordersId, setOrdersId] = useAtom(ordersIdAtom);
  const [merchantUid, setMerchantUid] = useAtom(merchantUidAtom);

  useEffect(() => {
    if (!params.ordersId || !params.merchantUid) return;

    setOrdersId(params.ordersId);
    setMerchantUid(params.merchantUid);
  }, [params]);

  return <>{!!ordersId && !!merchantUid && <AdminOrderDetail />}</>;
}
