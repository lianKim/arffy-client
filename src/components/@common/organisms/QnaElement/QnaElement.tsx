import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { convertDateFormat } from '../../../../utils/convertDateFormat';
import { HiCheckCircle } from '@react-icons/all-files/hi/HiCheckCircle';
import { AiOutlineLock } from '@react-icons/all-files/ai/AiOutlineLock';

interface QnaElementProps {
  title: string;
  createdAt: string;
  answered?: boolean;
  locked?: boolean;
  onClickElement?: React.MouseEventHandler<HTMLButtonElement>;
}

export default React.memo(function QnaElement({
  title,
  createdAt,
  answered,
  locked,
  onClickElement,
}: QnaElementProps) {
  const handleElementClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClickElement) return;

    onClickElement(e);
  };

  return (
    <ContainerButton type="button" onClick={handleElementClick}>
      <Title locked={locked}>
        <span>{title}</span>
        <IconsContainer>
          {!!answered && <StyledCheckIcon />}
          {!!locked && <StyledLockIcon />}
        </IconsContainer>
      </Title>
      <Date>{convertDateFormat(createdAt)}</Date>
    </ContainerButton>
  );
});

interface TitleProps {
  locked?: boolean;
}

const ContainerButton = styled.button`
  width: 100%;
  padding: 12px 10px;
  border-top: 1px solid var(--color-gray100);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Title = styled.span<TitleProps>`
  color: ${(props) =>
    props.locked ? 'var(--color-gray300)' : 'var(--color-navy)'};
`;

const Date = styled.span`
  letter-spacing: normal;
  color: var(--color-gray200);
  font-size: var(--font-x-micro);
`;

const IconsContainer = styled.span`
  position: absolute;
  left: calc(var(--font-micro) * 6);
  height: 16px;
`;

const StyledCheckIcon = styled(HiCheckCircle)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;

const StyledLockIcon = styled(AiOutlineLock)`
  width: 16px;
  height: 16px;
`;
