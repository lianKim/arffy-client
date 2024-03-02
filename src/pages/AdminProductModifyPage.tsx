import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminProductModify from '../components/AdminProductModify';
import { productIdAtom } from '../store/adminProductDetailAtom';

export default function AdminProductModifyPage() {
  // productId (from query string)
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [productId, setProductId] = useAtom(productIdAtom);

  useEffect(() => {
    if (id) {
      setProductId(Number(id));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      setProductId(null);
    };
  }, []);

  return <>{!!productId && <AdminProductModify />}</>;
}
