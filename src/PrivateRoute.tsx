import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: React.ReactNode;
  isAuthenticated: boolean;
}

export default function PrivateRoute({
  component: Component,
  isAuthenticated,
}: PrivateRouteProps) {
  return (
    <>
      {isAuthenticated ? (
        Component
      ) : (
        <Navigate
          to="/signin"
          state={{ prevUrl: window.location.href }}
          replace
        />
      )}
    </>
  );
}
