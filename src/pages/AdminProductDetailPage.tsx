import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminProductDetail from '../components/AdminProductDetail';
import { productIdAtom } from '../store/adminProductDetailAtom';
import { qnaProductIdAtom } from '../store/qnaListAtom';

export default function AdminProductDetailPage() {
  const params = useParams();
  const [productId, setProductId] = useAtom(productIdAtom);
  const [, setQnaProductId] = useAtom(qnaProductIdAtom);

  useEffect(() => {
    if (!params?.productId) return;

    const currentProductId = Number(params.productId);
    setProductId(currentProductId);
    setQnaProductId(currentProductId);
  }, [params?.productId]);

  useEffect(() => {
    return () => {
      setProductId(0);
      setQnaProductId(0);
    };
  }, []);

  return <>{!!productId && <AdminProductDetail />}</>;
}
