import React, { useEffect } from 'react';
import QnAList from '../components/QnAList';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { pageSetOffsetAtom, pageToMoveAtom } from '../store/qnaListAtom';

export default function QnAListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');

  const [, setPageToMove] = useAtom(pageToMoveAtom);
  const [, setPageOffset] = useAtom(pageSetOffsetAtom);

  useEffect(() => {
    if (!!page && !!offset) {
      setPageToMove(Number(page));
      setPageOffset(Number(offset));
    }
  }, [page, offset]);

  useEffect(() => {
    return () => {
      setPageToMove(0);
      setPageOffset(0);
    };
  }, []);

  return (
    <>
      {!!page && !!offset ? (
        <QnAList />
      ) : (
        <Navigate
          to={`/my/qna?page=${page || 0}&offset=${offset || 0}`}
          replace
        />
      )}
    </>
  );
}
