import React, { useEffect } from 'react';
import AdminQnAUpload from '../components/AdminQnAUpload';
import { useAtom } from 'jotai';
import { qnaIdAtom } from '../store/adminQnAListAtom';
import { answerQnAIdAtom } from '../store/adminQnAUploadAtom';
import { useParams } from 'react-router-dom';

export default function AdminQnAUploadPage() {
  const params = useParams();

  const [questionQnAId, setQuestionQnAId] = useAtom(qnaIdAtom);
  const [uploadQnAId, setUploadQnAId] = useAtom(answerQnAIdAtom);

  useEffect(() => {
    if (!params.qnaId) return;

    setQuestionQnAId(Number(params.qnaId));
    setUploadQnAId(Number(params.qnaId));
  }, [params.qnaId]);

  useEffect(() => {
    return () => {
      setQuestionQnAId(null);
      setUploadQnAId(null);
    };
  }, []);

  return <>{!!questionQnAId && <AdminQnAUpload />}</>;
}
