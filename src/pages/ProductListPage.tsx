import React, { useEffect } from 'react';
import ProductList from '../components/ProductList';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  categoryAtom,
  pageSetOffsetAtom,
  pageToMoveAtom,
} from '../store/productListAtom';

export default function ProductListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');
  const category = searchParams.get('category');

  const [, setCurrentCategory] = useAtom(categoryAtom);
  const [, setPageToMove] = useAtom(pageToMoveAtom);
  const [, setPageOffset] = useAtom(pageSetOffsetAtom);

  useEffect(() => {
    if (!!page && !!offset && !!category) {
      setPageToMove(Number(page));
      setPageOffset(Number(offset));
      setCurrentCategory(category);
    }
  }, [page, offset, category]);

  useEffect(() => {
    return () => {
      setPageToMove(0);
      setPageOffset(0);
      setCurrentCategory('all');
    };
  }, []);

  return (
    <>
      {!!page && !!offset && !!category ? (
        <ProductList />
      ) : (
        <Navigate
          to={`/product?category=${category || 'all'}&page=${
            page || 0
          }&offset=${offset || 0}`}
          replace
        />
      )}
    </>
  );
}
