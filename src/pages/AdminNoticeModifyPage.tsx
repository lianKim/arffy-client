import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import AdminNoticeModify from '../components/AdminNoticeModify';
import { currentNoticeIdAtom } from '../store/adminNoticeAtom';

export default function AdminNoticeModifyPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // 수정 시 불러올 notice id
  const [noticeId, setNoticeId] = useAtom(currentNoticeIdAtom);

  useEffect(() => {
    if (id) {
      setNoticeId(Number(id));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      setNoticeId(null);
    };
  }, []);

  return <>{!!noticeId && <AdminNoticeModify />}</>;
}
