import React from 'react';
import styled from 'styled-components';
import Name from './Name';
import Mobile from './Mobile';
import Address from './Address';

interface InfoObj {
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
}

interface UserProfileInfoProps {
  name: InfoObj;
  mobile: InfoObj;
  address: InfoObj;
  addressDetail: InfoObj;
  postcode: {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
  };
}

export default React.memo(function UserProfileInfo({
  name,
  mobile,
  address,
  addressDetail,
  postcode,
}: UserProfileInfoProps) {
  return (
    <>
      <Contents>
        <Name
          value={name.value}
          setValue={name.setValue}
          errorMessage={name.errorMessage}
          setErrorMessage={name.setErrorMessage}
        />
        <Mobile
          value={mobile.value}
          setValue={mobile.setValue}
          errorMessage={mobile.errorMessage}
          setErrorMessage={mobile.setErrorMessage}
        />
        <Address
          postcode={postcode}
          address={address}
          addressDetail={addressDetail}
        />
      </Contents>
    </>
  );
});
const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
