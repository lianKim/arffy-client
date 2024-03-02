import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollapsibleContainer from '../@common/molecules/CollapsibleContainer/CollapsibleContainer';
import UserProfileInfo from '../@common/organisms/UserProfileInfo/UserProfileInfo';
import { useAtom } from 'jotai';
import Button from '../@common/atoms/Button/Button';
import DeliveryAddressText from './DeliveryAddressText';
import {
  receiverNameAtom,
  receiverNameErrorMessageAtom,
  receiverMobileAtom,
  receiverMobileErrorMessageAtom,
  receiverPostcodeAtom,
  receiverAddressAtom,
  receiverAddressErrorMessageAtom,
  receiverAddressDetailAtom,
  receiverAddressDetailErrorMessageAtom,
  profileUpdateCheckedAtom,
} from '../../store/paymentAtom';
import DeliveryRequestInput from './DeliveryRequestInput';
import Checkbox from '../@common/atoms/Checkbox/Checkbox';
import { BuyerInfo } from '../../@types/payment';

interface DeliveryAddressProps {
  addressInfo: BuyerInfo;
  deliveryRequest: string;
}

export default React.memo(function DeliveryAddress({
  addressInfo,
  deliveryRequest,
}: DeliveryAddressProps) {
  const [name, setName] = useAtom(receiverNameAtom);
  const [mobile, setMobile] = useAtom(receiverMobileAtom);
  const [postcode, setPostcode] = useAtom(receiverPostcodeAtom);
  const [address, setAddress] = useAtom(receiverAddressAtom);
  const [addressDetail, setAddressDetail] = useAtom(receiverAddressDetailAtom);

  const [nameErrorMessage, setNameErrorMessage] = useAtom(
    receiverNameErrorMessageAtom,
  );
  const [mobileErrorMessage, setMobileErrorMessage] = useAtom(
    receiverMobileErrorMessageAtom,
  );
  const [addressErrorMessage, setAddressErrorMessage] = useAtom(
    receiverAddressErrorMessageAtom,
  );
  const [addressDetailErrorMessage, setAddressDetailErrorMessage] = useAtom(
    receiverAddressDetailErrorMessageAtom,
  );
  const [profileUpdateChecked, setProfileUpdateChecked] = useAtom(
    profileUpdateCheckedAtom,
  );

  // 수정 mode 여부
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const handleModifyingButtonClick = () => {
    setIsModifying((prev) => !prev);
  };

  // 에러 메세지 값 초기화 함수
  const resetValues = () => {
    setNameErrorMessage('');
    setMobileErrorMessage('');
    setAddressErrorMessage('');
    setAddressDetailErrorMessage('');
  };

  useEffect(() => {
    if (!addressInfo) return;

    setName(addressInfo.name);
    setMobile(addressInfo.mobile);
    setPostcode(addressInfo.postCode);
    setAddress(addressInfo.address);
    setAddressDetail(addressInfo.addressDetail);
  }, [addressInfo]);

  useEffect(() => {
    return () => {
      setTimeout(resetValues, 1000);
    };
  }, []);

  return (
    <>
      {addressInfo && (
        <CollapsibleContainer label="배송지" preview={address}>
          <ContentContainer>
            {isModifying ? (
              <ModifyingContainer>
                <UserProfileInfo
                  name={{
                    value: name,
                    setValue: setName,
                    errorMessage: nameErrorMessage,
                    setErrorMessage: setNameErrorMessage,
                  }}
                  mobile={{
                    value: mobile,
                    setValue: setMobile,
                    errorMessage: mobileErrorMessage,
                    setErrorMessage: setMobileErrorMessage,
                  }}
                  address={{
                    value: address,
                    setValue: setAddress,
                    errorMessage: addressErrorMessage,
                    setErrorMessage: setAddressErrorMessage,
                  }}
                  addressDetail={{
                    value: addressDetail,
                    setValue: setAddressDetail,
                    errorMessage: addressDetailErrorMessage,
                    setErrorMessage: setAddressDetailErrorMessage,
                  }}
                  postcode={{
                    value: postcode,
                    setValue: setPostcode,
                  }}
                />
                <DeliveryRequestInput />
                <Checkbox
                  checked={profileUpdateChecked}
                  onSetChecked={setProfileUpdateChecked}
                >
                  <span>위 내용을 회원정보에 반영합니다. </span>
                  <CheckboxSubText>{`(이름/휴대폰번호/주소)`}</CheckboxSubText>
                </Checkbox>
              </ModifyingContainer>
            ) : (
              <>
                <DeliveryAddressText
                  name={name}
                  mobile={mobile}
                  address={address}
                  addressDetail={addressDetail}
                />
                <DeliveryRequest>
                  배송요청사항 : {deliveryRequest || '없음'}
                </DeliveryRequest>
              </>
            )}
          </ContentContainer>
          <Button
            label={isModifying ? '완료' : '변경'}
            active={true}
            primary={isModifying}
            onClick={handleModifyingButtonClick}
          />
        </CollapsibleContainer>
      )}
    </>
  );
});

const ContentContainer = styled.div`
  margin-bottom: 28px;
`;

const ModifyingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const DeliveryRequest = styled.div`
  margin-top: 18px;
`;

const CheckboxSubText = styled.span`
  font-size: var(--font-x-micro);
  position: relative;
  top: -0.5px;
`;
