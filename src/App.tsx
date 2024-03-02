import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import GlobalStyles from './lib/styles/GlobalStyles';
import jwt_decode from 'jwt-decode';
import { useAtom } from 'jotai';
import { isAdminAtom } from './store/commonUIAtom';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import LoadingSpinner from './components/@common/molecules/Spinner/LoadingSpinner';
import GlobalErrorBoundary from './components/@common/organisms/ErrorBoundary/GlobalErrorBoundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import CustomToast from './components/@common/molecules/CustomToast/CustomToast';
import ApiErrorBoundary from './components/@common/organisms/ErrorBoundary/ApiErrorBoundary';
import { DecodedToken } from './@types/common';

// User
const LayoutPage = lazy(() => import('./pages/LayoutPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentResultPage = lazy(() => import('./pages/PaymentResultPage'));
const OrderListPage = lazy(() => import('./pages/OrderListPage'));
const OrderDetailPage = lazy(() => import('./pages/OrderDetailPage'));
const NoticeListPage = lazy(() => import('./pages/NoticeListPage'));
const SignInPage = lazy(() => import('./pages/SignInPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const MyAccountPage = lazy(() => import('./pages/MyAccountPage'));
const QnAUploadPage = lazy(() => import('./pages/QnAUploadPage'));
const QnAListPage = lazy(() => import('./pages/QnAListPage'));
const QnADetailPage = lazy(() => import('./pages/QnADetailPage'));
// Admin
const AdminProductUploadPage = lazy(
  () => import('./pages/AdminProductUploadPage'),
);
const AdminProductModifyPage = lazy(
  () => import('./pages/AdminProductModifyPage'),
);
const AdminProductListPage = lazy(() => import('./pages/AdminProductListPage'));
const AdminProductDetailPage = lazy(
  () => import('./pages/AdminProductDetailPage'),
);
const AdminNoticeUploadPage = lazy(
  () => import('./pages/AdminNoticeUploadPage'),
);
const AdminNoticeModifyPage = lazy(
  () => import('./pages/AdminNoticeModifyPage'),
);
const AdminNoticeListPage = lazy(() => import('./pages/AdminNoticeListPage'));
const AdminQnAListPage = lazy(() => import('./pages/AdminQnAListPage'));
const AdminQnADetailPage = lazy(() => import('./pages/AdminQnADetailPage'));
const AdminQnAUploadPage = lazy(() => import('./pages/AdminQnAUploadPage'));
const AdminOrderListPage = lazy(() => import('./pages/AdminOrderListPage'));
const AdminOrderDetailPage = lazy(() => import('./pages/AdminOrderDetailPage'));
const AdminOrderRefundPage = lazy(() => import('./pages/AdminOrderRefundPage'));
// Shop Info (in footer)
const InfoAgreementPage = lazy(() => import('./pages/InfoAgreementPage'));
const InfoPrivacyPage = lazy(() => import('./pages/InfoPrivacyPage'));
const InfoShopGuidePage = lazy(() => import('./pages/InfoShopGuidePage'));
// Not Found
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);
  const [hasToken, setHasToken] = useState<boolean>(false);

  // 페이지 단위 토큰 체크
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      setHasToken(false);
      setIsAdmin(false);
      return;
    }

    // admin 여부 체크
    setHasToken(true);
    const decoded: DecodedToken = jwt_decode(accessToken);
    setIsAdmin(decoded.role === 'ROLE_ADMIN');
  }, [location.key]);

  // 페이지 단위 스크롤 위치 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.key]);

  return (
    <>
      <GlobalStyles />
      <GlobalErrorBoundary key="global">
        <Suspense fallback={<LoadingSpinner />}>
          <CustomToast type="success" />
          <CustomToast type="error" />
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ApiErrorBoundary onReset={reset}>
                <Routes>
                  <Route path="/" element={<LayoutPage />}>
                    {/* User */}
                    <Route index element={<LandingPage />} />
                    <Route path="product">
                      <Route index element={<ProductListPage />} />
                      <Route
                        path=":productId"
                        element={<ProductDetailPage />}
                      />
                    </Route>
                    <Route
                      path="cart"
                      element={
                        <PrivateRoute
                          component={<CartPage />}
                          isAuthenticated={hasToken}
                        />
                      }
                    />
                    <Route
                      path="payment"
                      element={
                        <PrivateRoute
                          component={<PaymentPage />}
                          isAuthenticated={hasToken}
                        />
                      }
                    />
                    <Route
                      path="payment/result"
                      element={
                        <PrivateRoute
                          component={<PaymentResultPage />}
                          isAuthenticated={hasToken}
                        />
                      }
                    />
                    <Route path="notice" element={<NoticeListPage />} />
                    <Route path="signin" element={<SignInPage />} />
                    <Route path="auth" element={<AuthPage />} />
                    <Route path="my">
                      <Route
                        index
                        element={
                          <PrivateRoute
                            component={<MyAccountPage />}
                            isAuthenticated={hasToken}
                          />
                        }
                      />
                      <Route path="order">
                        <Route
                          path="list"
                          element={
                            <PrivateRoute
                              component={<OrderListPage />}
                              isAuthenticated={hasToken}
                            />
                          }
                        />
                        <Route
                          path="detail/:ordersId/:merchantUid"
                          element={
                            <PrivateRoute
                              component={<OrderDetailPage />}
                              isAuthenticated={hasToken}
                            />
                          }
                        />
                      </Route>
                      <Route path="qna">
                        <Route
                          index
                          element={
                            <PrivateRoute
                              component={<QnAListPage />}
                              isAuthenticated={hasToken}
                            />
                          }
                        />
                        <Route
                          path=":qnaId"
                          element={
                            <PrivateRoute
                              component={<QnADetailPage />}
                              isAuthenticated={hasToken}
                            />
                          }
                        />
                        <Route
                          path="upload"
                          element={
                            <PrivateRoute
                              component={<QnAUploadPage />}
                              isAuthenticated={hasToken}
                            />
                          }
                        />
                      </Route>
                      <Route
                        path="profile"
                        element={
                          <PrivateRoute
                            component={<UserProfilePage />}
                            isAuthenticated={hasToken}
                          />
                        }
                      />
                    </Route>
                    {/* Admin */}
                    <Route path="admin">
                      <Route path="product">
                        <Route
                          index
                          element={
                            <AdminRoute
                              component={<AdminProductListPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path=":productId"
                          element={
                            <AdminRoute
                              component={<AdminProductDetailPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path="upload"
                          element={
                            <AdminRoute
                              component={<AdminProductUploadPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path="modify"
                          element={
                            <AdminRoute
                              component={<AdminProductModifyPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                      </Route>
                      <Route path="notice">
                        <Route
                          index
                          element={
                            <AdminRoute
                              component={<AdminNoticeListPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path="upload"
                          element={
                            <AdminRoute
                              component={<AdminNoticeUploadPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path="modify"
                          element={
                            <AdminRoute
                              component={<AdminNoticeModifyPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                      </Route>
                      <Route path="qna">
                        <Route
                          index
                          element={
                            <AdminRoute
                              component={<AdminQnAListPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path=":qnaId"
                          element={
                            <AdminRoute
                              component={<AdminQnADetailPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route
                          path=":qnaId/comment"
                          element={
                            <AdminRoute
                              component={<AdminQnAUploadPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                      </Route>
                      <Route path="order">
                        <Route
                          path="list"
                          element={
                            <AdminRoute
                              component={<AdminOrderListPage />}
                              isAuthenticated={isAdmin}
                            />
                          }
                        />
                        <Route path="detail/:ordersId/:merchantUid">
                          <Route
                            index
                            element={
                              <AdminRoute
                                component={<AdminOrderDetailPage />}
                                isAuthenticated={isAdmin}
                              />
                            }
                          />
                          <Route
                            path="refund"
                            element={
                              <AdminRoute
                                component={<AdminOrderRefundPage />}
                                isAuthenticated={isAdmin}
                              />
                            }
                          />
                        </Route>
                      </Route>
                    </Route>
                    {/* 운영규정 */}
                    <Route path="info">
                      <Route path="agreement" element={<InfoAgreementPage />} />
                      <Route path="privacy" element={<InfoPrivacyPage />} />
                      <Route path="guide" element={<InfoShopGuidePage />} />
                    </Route>
                    {/* Not Found */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </ApiErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </Suspense>
      </GlobalErrorBoundary>
    </>
  );
}
