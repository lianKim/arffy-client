import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { UnauthorizedError } from '../utils/customErrors';
const { VITE_CLIENT_BASE_URL } = import.meta.env;

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('token');

  useEffect(() => {
    if (!accessToken) {
      throw new UnauthorizedError(
        '알 수 없는 에러가 발생하였습니다. 관리자에게 문의해주세요.',
      );
    }

    // 로컬 스토리지에 토큰 저장
    localStorage.setItem('accessToken', String(accessToken));
    // 세션 스토리지에서 이전 페이지 url 얻은 후 바로 제거
    const prevUrl = sessionStorage.getItem('prev_url');
    sessionStorage.removeItem('prev_url');

    window.location.replace(prevUrl || `${VITE_CLIENT_BASE_URL}/product`);
  }, [accessToken]);

  return <></>;
}
