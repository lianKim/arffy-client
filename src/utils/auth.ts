const { VITE_CLIENT_BASE_URL } = import.meta.env;

// 토큰이 없으면 로그인 페이지로 이동
export const checkHasToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken || accessToken === '') {
    window.location.href = `${VITE_CLIENT_BASE_URL}/signin`;
  }

  return accessToken && accessToken !== '';
};
