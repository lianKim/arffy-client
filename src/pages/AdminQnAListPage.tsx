import React, { useEffect } from 'react';
import AdminQnAList from '../components/AdminQnAList';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  isNoAnsweredOnlyAtom,
  pageSetOffsetAtom,
  pageToMoveAtom,
} from '../store/adminQnAListAtom';

export default function AdminQnAListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');
  const noAnsweredOnly = searchParams.get('no_answered');

  const [, setPageToMove] = useAtom(pageToMoveAtom);
  const [, setPageOffset] = useAtom(pageSetOffsetAtom);
  const [, setNoAnsweredOnly] = useAtom(isNoAnsweredOnlyAtom);

  useEffect(() => {
    if (!!page) {
      setPageToMove(Number(page));
    }
  }, [page]);

  useEffect(() => {
    if (!!offset) {
      setPageOffset(Number(offset));
    }
  }, [offset]);

  useEffect(() => {
    if (!!noAnsweredOnly) {
      setNoAnsweredOnly(noAnsweredOnly === 'true');
    }
  }, [noAnsweredOnly]);

  useEffect(() => {
    return () => {
      setPageToMove(0);
      setPageOffset(0);
      setNoAnsweredOnly(false);
    };
  }, []);

  return (
    <>
      {!!page && !!offset && !!noAnsweredOnly ? (
        <AdminQnAList />
      ) : (
        <Navigate
          to={`/admin/qna?page=${page || 0}&offset=${offset || 0}&no_answered=${
            noAnsweredOnly || false
          }`}
          replace
        />
      )}
    </>
  );
}
