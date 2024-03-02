import React from 'react';
import styled from 'styled-components';
import { convertDateFormat } from '../../../../utils/convertDateFormat';

interface NoticeElementProps {
  title: string;
  createdAt: string;
  active?: boolean;
  topFixed?: boolean;
  onClickElement?: React.MouseEventHandler<HTMLButtonElement>;
}

export default React.memo(function NoticeElement({
  title,
  createdAt,
  active,
  topFixed,
  onClickElement,
}: NoticeElementProps) {
  const handleElementClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClickElement) return;

    onClickElement(e);
  };

  return (
    <ContainerButton type="button" onClick={handleElementClick}>
      <Title active={active} topFixed={topFixed}>
        <span>{title}</span>
      </Title>
      <Date>{convertDateFormat(createdAt)}</Date>
    </ContainerButton>
  );
});

interface TitleProps {
  active?: boolean;
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
