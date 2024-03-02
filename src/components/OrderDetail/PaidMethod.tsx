import React from 'react';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import styled from 'styled-components';

interface PaidMethodProps {
  pgProvider: string;
  payMethod?: string;
}

export default React.memo(function PaidMethod({
  pgProvider,
  payMethod,
}: PaidMethodProps) {
  return (
    <CollapsibleContainer label="결제수단" preview={pgProvider} isClosed>
      <ProviderAndMethod>
        <span>{pgProvider}</span>
        {!!payMethod && (
          <>
            <span>/</span>
            <span>{payMethod}</span>
          </>
        )}
      </ProviderAndMethod>
    </CollapsibleContainer>
  );
});

const ProviderAndMethod = styled.div`
  & span {
    margin-right: 6px;
  }
`;
