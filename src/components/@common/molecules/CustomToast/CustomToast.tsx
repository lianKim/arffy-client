import React from 'react';
import { ToastContainer, cssTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import 'animate.css';

interface CustomToastProps {
  type: 'success' | 'error';
  position?: 'top' | 'bottom';
}

export default React.memo(function CustomToast({
  type,
  position = 'top',
}: CustomToastProps) {
  return (
    <StyledToastContainer
      limit={1}
      autoClose={4000}
      closeOnClick
      position={position === 'bottom' ? 'bottom-center' : 'top-center'}
      transition={
        position === 'bottom' ? BottomCenterTransition : TopCenterTransition
      }
      enableMultiContainer
      containerId={type === 'success' ? type : undefined}
    />
  );
});

const TopCenterTransition = cssTransition({
  enter: 'animate__animated animate__fadeInDown animate__faster',
  exit: 'animate__animated animate__fadeOutUp animate__faster',
});

const BottomCenterTransition = cssTransition({
  enter: 'animate__animated animate__fadeInUp animate__faster',
  exit: 'animate__animated animate__fadeOutDown animate__faster',
});

interface ToastContainerProps {
  containerId?: 'success' | 'error';
}

const StyledToastContainer = styled(ToastContainer as any)<ToastContainerProps>`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
    /* background-color: var(--color-orange); */
    background: none;
    box-shadow: none;
    width: 100vw;

    @media screen and (min-width: 1024px) {
      max-width: 420px;
      border-radius: 16px;
    }
  }
  .Toastify__toast {
    background-color: ${(props) =>
      props.containerId === 'success'
        ? 'var(--color-navy)'
        : 'var(--color-orange)'};
    border-top: 1px solid white;
    border-bottom: 1px solid white;
    border: 1px solid var(--color-white);
    box-shadow: none;
    min-height: 72px;
  }
  .Toastify__toast-body {
    color: var(--color-white);
    text-align: center;
    white-space: pre-line;
    line-height: calc(var(--font-micro) * 1.4);
  }
  .Toastify__progress-bar {
    background-color: ${(props) =>
      props.containerId === 'success'
        ? 'var(--color-gray200)'
        : 'var(--color-yellow)'};
  }
  .Toastify__close-button {
    color: var(--color-white);
    opacity: 0.3;
  }
  .Toastify__toast-icon svg {
    fill: ${(props) =>
      props.containerId === 'success'
        ? 'var(--color-gray200)'
        : 'var(--color-yellow)'};
  }
`;
