import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from '@react-icons/all-files/fi/FiChevronDown';

interface CollapsibleContainerProps {
  label?: string;
  preview?: string;
  children: React.ReactNode;
  isClosed?: boolean;
}

export default React.memo(function CollapsibleContainer({
  label,
  preview,
  children,
  isClosed,
}: CollapsibleContainerProps) {
  const [isOpen, setIsOpen] = useState(!isClosed);

  const handleToggleButtonClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Container>
      <Divider />
      <LabelContainerButton type="button" onClick={handleToggleButtonClick}>
        <Label>{label}</Label>
        {!isOpen && <PreviewContent>{preview}</PreviewContent>}
        <FiChevronDown size="16" color="var(--color-gray200)" />
      </LabelContainerButton>
      {isOpen && <ChildrenContainer>{children}</ChildrenContainer>}
    </Container>
  );
});

const Container = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const Divider = styled.div`
  width: 14px;
  height: 1px;
  background-color: var(--color-navy);
  margin-bottom: 14px;
`;

const LabelContainerButton = styled.button`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.div`
  font-weight: var(--weight-semi-bold);
  letter-spacing: normal;
`;

const PreviewContent = styled.span`
  max-width: 56%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-gray300);
  position: absolute;
  right: 32px;
  letter-spacing: normal;
`;

const ChildrenContainer = styled.div`
  padding-bottom: 48px;
`;
