import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { topFixedAtom } from '../../store/adminNoticeUploadAtom';

interface TopFixedCheckBoxProps {
  isChecked?: boolean;
}

export default React.memo(function TopFixedCheckBox({
  isChecked,
}: TopFixedCheckBoxProps) {
  const [topFixed, setTopFixed] = useAtom(topFixedAtom);

  const handleTopFixed = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    setTopFixed(value);
  };

  useEffect(() => {
    if (isChecked) {
      setTopFixed(!!isChecked);
    }
  }, [isChecked]);

  // 언마운트 시 topFixed 값 초기화
  useEffect(() => {
    return () => {
      setTopFixed(false);
    };
  }, []);

  return (
    <Row>
      <RowTitle>TOP FIXED</RowTitle>
      <CheckBox type="checkbox" checked={topFixed} onChange={handleTopFixed} />
    </Row>
  );
});

const Row = styled.div`
  margin-bottom: 36px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input,
  select,
  textarea {
    width: 100%;
  }
`;

const RowTitle = styled.div`
  letter-spacing: normal;
  font-size: var(--font-x-micro);
  font-weight: var(--weight-semi-bold);
`;

const CheckBox = styled.input`
  && {
    width: 16px;
    height: 16px;
    display: inline;
    margin: 0;
  }
`;
