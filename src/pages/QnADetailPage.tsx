import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QnADetail from '../components/QnADetail';
import { useAtom } from 'jotai';
import { qnaIdAtom } from '../store/qnaListAtom';

export default function QnADetailPage() {
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

  return <>{!!qnaId && <QnADetail />}</>;
}
