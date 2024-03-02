import React from 'react';
import styled from 'styled-components';

interface DetailsProps {
  period: string;
  country: string;
  width?: string;
  depth?: string;
  height?: string;
  minLineHeight?: string;
  maxLineHeight?: string;
  material: string;
  condition: string;
}

export default React.memo(function Details({
  period,
  country,
  width,
  depth,
  height,
  minLineHeight,
  maxLineHeight,
  material,
  condition,
}: DetailsProps) {
  return (
    <Container>
      <Divider />
      <Row>
        <RowTitle>Period</RowTitle>
        <span>{period}</span>
      </Row>
      <Row>
        <RowTitle>Country</RowTitle>
        <span>{country}</span>
      </Row>
      <Row>
        <RowTitle>Size</RowTitle>
        {width !== '0' && depth !== '0' && height !== '0' && (
          <span>{`${width}W x ${depth}D x ${height}H`}</span>
        )}
        {width === '0' && <span>{`${depth}D x ${height}H`}</span>}
        {depth === '0' && <span>{`${width}W x ${height}H`}</span>}
        {height === '0' && <span>{`${width}W x ${depth}D`}</span>}
      </Row>
      {minLineHeight !== '0' && (
        <Row>
          <RowTitle>Line Height</RowTitle>
          <span>
            {minLineHeight === maxLineHeight
              ? `${minLineHeight}cm`
              : `${minLineHeight} ~ ${maxLineHeight}cm`}
          </span>
        </Row>
      )}
      <Row>
        <RowTitle>Material</RowTitle>
        <span>{material}</span>
      </Row>
      <Row>
        <RowTitle>Condition</RowTitle>
        <span>{condition}</span>
      </Row>
    </Container>
  );
});

const Container = styled.div`
  word-break: keep-all;
`;

const Divider = styled.div`
  width: 14px;
  height: 1px;
  background-color: var(--color-navy);
  margin-bottom: 18px;
`;

const Row = styled.div`
  width: 100%;
  margin-bottom: calc(var(--font-micro) * 1.3);
  line-height: calc(var(--font-micro) * 1.5);
  display: flex;
  align-items: flex-start;
  white-space: pre-wrap;

  & > span {
    display: inline-block;
    width: 50%;
    letter-spacing: normal;
  }
`;

const RowTitle = styled.span`
  font-weight: var(--weight-semi-bold);
`;
