import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminQnADetail from '../components/AdminQnADetail';
import { useAtom } from 'jotai';
import { qnaIdAtom } from '../store/adminQnAListAtom';

export default function AdminQnADetailPage() {
  const params = useParams();
  const [qnaId, setQnAId] = useAtom(qnaIdAtom);

  useEffect(() => {
    if (!params.qnaId) return;

    setQnAId(Number(params.qnaId));
  }, [params?.qnaId]);

  useEffect(() => {
    return () => {
      setQnAId(null);
    };
  }, []);

  return <>{!!qnaId && <AdminQnADetail />}</>;
}
