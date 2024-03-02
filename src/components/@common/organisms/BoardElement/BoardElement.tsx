import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { convertDateFormat } from '../../../../utils/convertDateFormat';
import { HiCheckCircle } from '@react-icons/all-files/hi/HiCheckCircle';

interface BoardElementProps {
  title: string;
  createdAt: string;
  answered?: boolean;
  locked?: boolean;
  topFixed?: boolean;
  onClickElement?: React.MouseEventHandler<HTMLButtonElement>;
}

export default React.memo(function BoardElement({
  title,
  createdAt,
  topFixed,
  answered,
  locked,
  onClickElement,
}: BoardElementProps) {
  const [clicked, setClicked] = useState<boolean>(false);

  const handleElementClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClickElement) onClickElement(e);
    setClicked((prev) => !prev);
  };

  return (
    <ContainerButton type="button" onClick={handleElementClick}>
      <Title active={clicked} topFixed={topFixed}>
        <span>{title}</span>
        <IconsContainer>{!!answered && <StyledCheckIcon />}</IconsContainer>
      </Title>
      <Date>{convertDateFormat(createdAt)}</Date>
    </ContainerButton>
  );
});

interface TitleProps {
  active: boolean;
  topFixed?: boolean;
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
    props.topFixed ? 'var(--color-orange)' : 'var(--color-navy)'};
  font-weight: ${(props) =>
    props.active ? 'var(--weight-semi-bold)' : 'var(--weight-regular'};
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
  /* position: absolute;
  left: calc(var(--font-micro) * 6); */
  width: 16px;
  height: 16px;
`;
