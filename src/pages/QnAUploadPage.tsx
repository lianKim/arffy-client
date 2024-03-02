import React, { useEffect } from 'react';
import QnAUpload from '../components/QnAUpload';
import { useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { qnaProductIdAtom } from '../store/qnaUploadAtom';

export default function QnAUploadPage() {
  const location = useLocation();
  const productId = location.state?.productId;
  const [, setQnAProductId] = useAtom(qnaProductIdAtom);

  useEffect(() => {
    if (!!productId) {
      setQnAProductId(productId);
    }
  }, [productId]);

  useEffect(() => {
    return () => {
      setQnAProductId(null);
    };
  }, []);

  return <QnAUpload />;
}
