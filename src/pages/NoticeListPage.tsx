import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import NoticeList from '../components/NoticeList';
import {
  currentNoticeIdAtom,
  pageSetOffsetAtom,
  pageToMoveAtom,
} from '../store/noticeListAtom';
import { Navigate, useSearchParams } from 'react-router-dom';

export default function NoticeListPage() {
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
        <NoticeList />
      ) : (
        <Navigate
          to={`/notice?page=${page || 0}&offset=${offset || 0}`}
          replace
        />
      )}
    </>
  );
}
