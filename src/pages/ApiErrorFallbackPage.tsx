import React from 'react';
import RetryErrorFallback from '../components/@common/organisms/ErrorFallback/RetryErrorFallback';
import ForbiddenErrorFallback from '../components/@common/organisms/ErrorFallback/ForbiddenErrorFallback';
import NotFoundErrorFallback from '../components/@common/organisms/ErrorFallback/NotFoundErrorFallback';
import UnknownErrorFallback from '../components/@common/organisms/ErrorFallback/UnknownErrorFallback';

interface ErrorPageProps {
  httpStatus: number | null | undefined;
  errorMessage?: string | false;
  resetErrorBoundary: () => void;
}

export default function ApiErrorFallbackPage({
  errorMessage,
  httpStatus,
  resetErrorBoundary,
}: ErrorPageProps) {
  return (
    <>
      {httpStatus === 400 ? (
        <RetryErrorFallback
          message={errorMessage}
          onResetError={resetErrorBoundary}
        />
      ) : httpStatus === 403 ? (
        <ForbiddenErrorFallback
          message={errorMessage}
          onResetError={resetErrorBoundary}
        />
      ) : httpStatus === 404 ? (
        <NotFoundErrorFallback
          message={errorMessage}
          onResetError={resetErrorBoundary}
        />
      ) : httpStatus === 500 ? (
        <UnknownErrorFallback
          message={
            errorMessage || `서버 내부 에러입니다.\n관리자에게 문의해주세요.`
          }
          onResetError={resetErrorBoundary}
        />
      ) : (
        <UnknownErrorFallback
          message={errorMessage}
          onResetError={resetErrorBoundary}
        />
      )}
    </>
  );
}
