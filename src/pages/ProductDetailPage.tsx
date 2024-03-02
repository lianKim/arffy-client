import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail';
import { productIdAtom } from '../store/productDetailAtom';
import { qnaProductIdAtom } from '../store/qnaListAtom';

export default function ProductDetailPage() {
  const params = useParams();
  const [productId, setProductId] = useAtom(productIdAtom);
  const [qnaProductId, setQnaProductId] = useAtom(qnaProductIdAtom);

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

  return <>{!!productId && <ProductDetail />}</>;
}
