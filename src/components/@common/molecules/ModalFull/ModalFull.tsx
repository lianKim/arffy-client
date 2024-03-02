import React, { SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';

interface ModalFullProps {
  children: React.ReactNode;
  onClose?: React.Dispatch<SetStateAction<boolean>>;
}

export default React.memo(function ModalFull({
  children,
  onClose,
}: ModalFullProps) {
  const handleModalClose = () => {
    if (onClose) {
      onClose(false);
    } else {
      history.back();
    }
  };

  // 모달이 띄워졌을 때 스크롤 방지 (화면 고정)
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <Container>
      <Dialog>{children}</Dialog>
      <CloseButton type="button" onClick={handleModalClose}>
        <CloseIcon />
      </CloseButton>
    </Container>
  );
});

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 9998;

  @media screen and (min-width: 1024px) {
    width: 100%;
  }
`;

const Dialog = styled.dialog`
  position: relative;
  width: 90vw;
  height: 100%;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-navy);
  background: white;
  border: 0;
  margin: 0 auto;
  /* overflow-y: auto; */

  @media screen and (min-width: 1024px) {
    width: 30vw;
    padding: 60px 0 100px;
  }
`;

const CloseButton = styled.button`
  padding: 2px;
  position: absolute;
  top: 4px;
  right: 4px;

  @media screen and (min-width: 1024px) {
    top: 32px;
    right: calc(5vw - 16px - 2px);
  }
`;

const CloseIcon = styled(IoIosClose)`
  font-size: var(--font-huge);
  color: var(--color-gray200);

  @media screen and (min-width: 1024px) {
    font-size: 32px;
  }
`;
