import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ButtonsPair from '../ButtonsPair/ButtonsPair';
import Button from '../../atoms/Button/Button';
import { IoIosClose } from '@react-icons/all-files/io/IoIosClose';
import { SetStateAction } from 'jotai';

interface ModalProps {
  children: React.ReactNode;
  onClose: React.Dispatch<SetStateAction<boolean>>;
  onClickPrimaryButton: React.MouseEventHandler<HTMLButtonElement>;
  /** default 기능은 모달 닫기 */
  onClickSecondaryButton?: React.MouseEventHandler<HTMLButtonElement>;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  singleButton?: boolean;
  warning?: boolean;
}

export default React.memo(function Modal({
  children,
  onClose,
  onClickSecondaryButton,
  onClickPrimaryButton,
  primaryButtonText,
  secondaryButtonText,
  singleButton = false,
  warning = false,
}: ModalProps) {
  const [scrollY, setScrollY] = useState<string>('0');

  const handleModalClose = () => {
    onClose(false);
  };

  // 모달이 띄워졌을 때 스크롤 방지 (화면 고정)
  useEffect(() => {
    setScrollY(`${window.scrollY}px`);

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
    <>
      {/* {isOpen && ( */}
      <Wrapper scrollY={scrollY}>
        <Container>
          <Dialog warning={warning}>{children}</Dialog>
          {singleButton ? (
            <Button
              label="확인"
              onClick={onClickPrimaryButton}
              primary={true}
              active={true}
            />
          ) : (
            <ButtonsPair
              primaryButtonText={primaryButtonText}
              secondaryButtonText={secondaryButtonText}
              onClickPrimaryButton={onClickPrimaryButton}
              onClickSecondaryButton={
                onClickSecondaryButton || handleModalClose
              }
              active={true}
              warning={warning}
            />
          )}
          <CloseButton type="button" onClick={handleModalClose}>
            <CloseIcon />
          </CloseButton>
        </Container>
      </Wrapper>
      {/* )} */}
    </>
  );
});

interface WrapperProps {
  scrollY: string;
}

interface DialogProps {
  warning?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  top: ${(props) => props.scrollY};
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(28, 28, 28, 0.8);
  z-index: 9998;
`;

const Container = styled.div`
  position: relative;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  z-index: 9999;

  @media screen and (min-width: 1024px) {
    max-width: 360px;
  }
`;

const Dialog = styled.dialog<DialogProps>`
  padding: 48px 24px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  color: ${(props) =>
    props.warning ? 'var(--color-orange)' : 'var(--color-navy)'};
  background: var(--color-white);
  border: 1px solid
    ${(props) => (props.warning ? 'var(--color-orange)' : 'var(--color-navy)')};
  border-bottom: 0;
`;

const CloseButton = styled.button`
  padding: 2px;
  position: absolute;
  top: 4px;
  right: 4px;
`;

const CloseIcon = styled(IoIosClose)`
  font-size: var(--font-huge);
  color: var(--color-gray200);
`;
