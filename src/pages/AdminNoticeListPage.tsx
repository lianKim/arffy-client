import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import AdminNoticeList from '../components/AdminNoticeList';
import {
  currentNoticeIdAtom,
  pageToMoveAtom,
  pageSetOffsetAtom,
} from '../store/adminNoticeAtom';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function AdminNoticeListPage() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const offset = searchParams.get('offset');

  const [, setPageToMove] = useAtom(pageToMoveAtom);
  const [, setPageOffset] = useAtom(pageSetOffsetAtom);
  const [, setCurrentNoticeId] = useAtom(currentNoticeIdAtom);

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

  // 언마운트 될 때 currentNoticeId 초기화
  useEffect(() => {
    setCurrentNoticeId(null);
  }, []);

  return (
    <>
      {!!page && !!offset ? (
        <AdminNoticeList />
      ) : (
        <Navigate
          to={`/admin/notice?page=${page || 0}&offset=${offset || 0}`}
          replace
        />
      )}
    </>
  );
}
