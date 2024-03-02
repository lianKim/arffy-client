import React, { useEffect } from 'react';
import AdminProductList from '../components/AdminProductList';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  pageToMoveAtom,
  stockAtom,
  categoryAtom,
  pageSetOffsetAtom,
} from '../store/adminProductListAtom';

export default function AdminProductListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');
  const category = searchParams.get('category');
  const stock = searchParams.get('stock');

  const [, setCurrentCategory] = useAtom(categoryAtom);
  const [, setCurrentStock] = useAtom(stockAtom);
  const [, setPageToMove] = useAtom(pageToMoveAtom);
  const [, setPageOffset] = useAtom(pageSetOffsetAtom);

  useEffect(() => {
    if (!!page && !!offset && !!category && !!stock) {
      setPageToMove(Number(page));
      setPageOffset(Number(offset));
      setCurrentCategory(category);
      setCurrentStock(stock);
    }
  }, [page, offset, category, stock]);

  useEffect(() => {
    return () => {
      setPageToMove(0);
      setPageOffset(0);
      setCurrentCategory('all');
      setCurrentStock('');
    };
  }, []);

  return (
    <>
      {!!page && !!offset && !!category && !!stock ? (
        <AdminProductList />
      ) : (
        <Navigate
          to={`/admin/product?category=${category || 'all'}&stock=${
            stock || 'all'
          }&page=${page || 0}&offset=${offset || 0}`}
          replace
        />
      )}
    </>
  );
}
