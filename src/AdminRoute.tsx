import React from 'react';
import NotFoundPage from './pages/NotFoundPage';

interface AdminRouteProps {
  component: React.ReactNode;
  isAuthenticated: boolean;
}

export default function AdminRoute({
  component: Component,
  isAuthenticated,
}: AdminRouteProps) {
  return (
    <>
      <>{isAuthenticated ? Component : <NotFoundPage />}</>
    </>
  );
}
