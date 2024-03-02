import axios, { AxiosError } from 'axios';
import React, { Component, ErrorInfo, PropsWithChildren } from 'react';
import NotFoundPage from '../../../../pages/NotFoundPage';
import { Navigate } from 'react-router-dom';
import ApiErrorFallbackPage from '../../../../pages/ApiErrorFallbackPage';
import {
  ADMIN_CUSTOM_ERROR_MESSAGE,
  USER_CUSTOM_ERROR_MESSAGE,
} from '../../../../lib/constants/errorMessages';
import { signOutAPI } from '../../../../lib/apis/signInAPIs';

type ErrorFallbackProps =
  | {
      httpStatus: number | null | undefined;
      errorCode: string | null | undefined;
      isAdminPage: boolean;
      resetErrorBoundary: () => void;
    }
  | {
      error: Error | AxiosError<ResponseDataType> | null;
      resetErrorBoundary: () => void;
    };

interface ErrorBoundaryProps {
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onReset?: () => void;
}

type ErrorBoundaryState =
  | {
      error: null;
      errorCode: null;
      httpStatus: null;
      isAdminPage: boolean;
    }
  | {
      error: Error;
      errorCode: null;
      httpStatus: null;
      isAdminPage: boolean;
    }
  | {
      error: AxiosError;
      errorCode: string | null | undefined;
      httpStatus: number | null | undefined;
      isAdminPage: boolean;
    };

const initialState: ErrorBoundaryState = {
  error: null,
  errorCode: null,
  httpStatus: null,
  isAdminPage: false,
};

type ResponseDataType = {
  message: string;
  code: string;
};

export default class ApiErrorBoundary extends Component<
  PropsWithChildren<ErrorBoundaryProps>,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null,
    errorCode: null,
    httpStatus: null,
    isAdminPage: false,
  };

  resetErrorBoundary = () => {
    this.props.onReset?.();
    this.setState(initialState);
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    const isAdminPage = /^\/admin/.test(window.location.pathname);

    if (!axios.isAxiosError(error)) {
      return { error, errorCode: null, httpStatus: null, isAdminPage };
    }

    const errorCode = axios.isAxiosError<ResponseDataType>(error)
      ? error?.response?.data?.code
      : undefined;
    const httpStatus = error.response?.status || error.status;

    if (httpStatus) {
      return { error, errorCode, httpStatus, isAdminPage };
    }

    return { error, errorCode: null, httpStatus: null, isAdminPage };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { state, props, resetErrorBoundary } = this;
    const { fallback: FallbackComponent, children } = props;
    const { error, errorCode, httpStatus, isAdminPage } = state;

    // 에러가 없으면 정상적으로 children 컴포넌트 렌더
    if (!error) return children;

    // 인증되지 않은 사용자거나 권한이 없는 경우 admin 페이지를 없는 페이지로 보이도록 처리
    if ((httpStatus === 401 || httpStatus === 403) && isAdminPage) {
      return <NotFoundPage />;
    }

    // axios 에러가 아니거나 http status를 알 수 없는 경우 global error boundary로 넘기기
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (httpStatus === 401) {
      const currAccessToken = localStorage.getItem('accessToken');

      if (errorCode === '10103' && currAccessToken) {
        signOutAPI(currAccessToken);
      }

      localStorage.removeItem('accessToken');

      return (
        <Navigate
          to="/signin"
          state={{ prevUrl: window.location.href }}
          replace
        />
      );
    }

    if (FallbackComponent) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={resetErrorBoundary}
        />
      );
    }

    const errorMessage =
      !!errorCode &&
      (isAdminPage
        ? ADMIN_CUSTOM_ERROR_MESSAGE[errorCode]
        : USER_CUSTOM_ERROR_MESSAGE[errorCode]);

    return (
      <ApiErrorFallbackPage
        errorMessage={errorMessage}
        httpStatus={httpStatus}
        resetErrorBoundary={resetErrorBoundary}
      />
    );
  }
}
