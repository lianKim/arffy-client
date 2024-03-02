import React, { useCallback, useState } from 'react';
import FormFieldContainer from '../../molecules/FormFieldContainer/FormFieldContainer';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import AddressFinder from '../AddressFinder/AddressFinder';
import Input from '../../atoms/Input/Input';

interface AddressProps {
  postcode: {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
  };
  address: {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    errorMessage: string;
    setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  };
  addressDetail: {
    value: string;
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    errorMessage: string;
    setErrorMessage?: React.Dispatch<React.SetStateAction<string>>;
  };
}

export default React.memo(function Address({
  postcode,
  address,
  addressDetail,
}: AddressProps) {
  const [isAddressFinderOpen, setIsAddressFinderOpen] =
    useState<boolean>(false);

  // 우편번호 찾기 모달 띄위주는 onClick 함수
  const handleAddressFinderOpen = () => {
    setIsAddressFinderOpen(true);
  };

  // 상세 주소 입력 onChange 함수
  const handleAddressDetailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!addressDetail.setValue || !addressDetail.setErrorMessage) return;

    const value = e.target.value;
    addressDetail.setValue(value);
  };

  // 주소 찾기 complete 콜백 : 선택한 주소 저장 및 모달 닫아주는 함수
  const addressFinderCallback = useCallback((data: any) => {
    if (!postcode.setValue || !address.setValue) return;

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    postcode.setValue(data.zonecode);
    address.setValue(fullAddress);
  }, []);

  const closeAddressFinder = useCallback(() => {
    setIsAddressFinderOpen(false);
  }, []);

  return (
    <>
      {isAddressFinderOpen && (
        <AddressFinder
          completeFn={addressFinderCallback}
          onCloseModal={closeAddressFinder}
        />
      )}
      <FormFieldContainer
        label="ADDRESS"
        errorMessage={address.errorMessage || addressDetail.errorMessage}
      >
        <AddressContainer>
          <PostCode>
            <input
              placeholder="우편번호를 입력해주세요"
              value={postcode.value}
              disabled
            />
            <FindPostCodeButton type="button" onClick={handleAddressFinderOpen}>
              우편번호 검색
            </FindPostCodeButton>
          </PostCode>
          <input
            placeholder="주소를 입력해주세요"
            value={address.value}
            disabled
          />
          <Input
            placeholder="상세주소를 입력해주세요"
            value={addressDetail.value}
            onChange={handleAddressDetailInput}
            hasError={!!addressDetail.errorMessage}
          />
        </AddressContainer>
      </FormFieldContainer>
    </>
  );
});

const AddressContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PostCode = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;

  & input {
    width: 100%;
    margin: 0;
  }
`;

const FindPostCodeButton = styled.button`
  border: 1px solid var(--color-navy);
  height: 32px;
  padding: 0 8px;
  width: 36%;
  min-width: 90px;
  max-width: 130px;
`;
