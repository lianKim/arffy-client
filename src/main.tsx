import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'jotai/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useHydrateAtoms } from 'jotai/react/utils';
import { queryClientAtom } from 'jotai-tanstack-query';
import axios from 'axios';
import { handleAdminError, handleUserError } from './utils/handleErrors';
const { VITE_ADMIN_SERVER_BASE_URL } = import.meta.env;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      suspense: true,
      useErrorBoundary: true,
      staleTime: 60000,
      cacheTime: 300000,
    },
    mutations: {
      retry: false,
      // 커스텀 에러 코드가 없거나, http status가 401, 403, 404인 경우에만 에러 바운더리 활성화
      useErrorBoundary: (error) => {
        if (!axios.isAxiosError(error)) return true;

        const errorCode = error.response?.data?.code;
        const httpStatus = error.response?.status || error.status;

        return (
          !errorCode ||
          httpStatus === 401 ||
          httpStatus === 403 ||
          httpStatus === 404
        );
        // return !errorCode || httpStatus === 401;
      },
      onError: (error) => {
        if (!axios.isAxiosError(error)) {
          throw error;
        }

        // 401, 403, 404는 에러 바운더리에서 처리
        const httpStatus = error.response?.status || error.status;
        if (httpStatus === 401 || httpStatus === 403 || httpStatus === 404) {
          return;
        }

        if (error.config?.baseURL === VITE_ADMIN_SERVER_BASE_URL) {
          handleAdminError(error);
          return;
        }

        handleUserError(error);
      },
    },
  },
});

const HydrateAtoms = ({ children }: React.PropsWithChildren) => {
  useHydrateAtoms([[queryClientAtom, queryClient]]);
  return <>{children}</>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <Provider>
      <BrowserRouter>
        <HydrateAtoms>
          <App />
        </HydrateAtoms>
      </BrowserRouter>
    </Provider>
  </QueryClientProvider>,
);
