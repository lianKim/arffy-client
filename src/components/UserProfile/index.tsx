import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai';
import {
  addressAtom,
  addressDetailAtom,
  addressDetailErrorMessageAtom,
  addressErrorMessageAtom,
  phoneNumberAtom,
  phoneNumberErrorMessageAtom,
  postCodeAtom,
  userInfoDataAtom,
  userNameAtom,
  userNameErrorMessageAtom,
} from '../../store/userInfoAtom';
import UserProfileInfo from '../@common/organisms/UserProfileInfo/UserProfileInfo';
import {
  useUserInfoData,
  useUserInfoUpdateMutation,
} from '../../lib/apis/userInfoAPIs';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import { toast } from 'react-toastify';
import {
  PHONE_NUMBER_REG_EXP,
  USER_NAME_REG_EXP,
} from '../../lib/constants/regExp';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import AccountDeleteConfirmModal from '../@common/organisms/UserProfileInfo/AccountDeleteConfirmModal';

export default React.memo(function UserProfile() {
  const [buttonActive, setButtonActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: userInfo } = useUserInfoData();

  const [userName, setUserName] = useAtom(userNameAtom);
  const [phoneNumber, setPhoneNumber] = useAtom(phoneNumberAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const [addressDetail, setAddressDetail] = useAtom(addressDetailAtom);
  const [postCode, setPostCode] = useAtom(postCodeAtom);
  const { mutate: updateUserInfo } = useUserInfoUpdateMutation();
  const [userInfoData] = useAtom(userInfoDataAtom);
  // 에러 메세지 저장하는 atom
  const [userNameErrorMessage, setUserNameErrorMessage] = useAtom(
    userNameErrorMessageAtom,
  );
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useAtom(
    phoneNumberErrorMessageAtom,
  );
  const [addressErrorMessage, setAddressErrorMessage] = useAtom(
    addressErrorMessageAtom,
  );
  const [addressDetailErrorMessage, setAddressDetailErrorMessage] = useAtom(
    addressDetailErrorMessageAtom,
  );

  // 앞뒤 공백 제거해주는 함수
  const TrimValues = () => {
    setUserName((prev) => prev?.trim());
    setPhoneNumber((prev) => prev?.trim());
    setAddressDetail((prev) => prev?.trim());
  };

  const validateValues = () => {
    if (!userName) {
      throw new PropertyRequiredError('이름');
    }

    if (!phoneNumber) {
      throw new PropertyRequiredError('휴대폰번호');
    }

    if (!address) {
      throw new PropertyRequiredError('주소');
    }

    if (!USER_NAME_REG_EXP.test(userName)) {
      throw new ValidationError('이름은 2~20자의 한글/영어를 입력해주세요.');
    }

    if (!PHONE_NUMBER_REG_EXP.test(phoneNumber)) {
      throw new ValidationError('휴대폰 번호는 10~11자의 숫자를 입력해주세요.');
    }
  };

  // 회원 정보 수정 요청 onClick 함수
  const handleSubmit = () => {
    TrimValues();

    try {
      validateValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    updateUserInfo(userInfoData, {
      onSuccess: () => {
        toast.success('회원정보를 수정하였습니다.', { containerId: 'success' });
      },
    });
  };

  // 탈퇴 확인 모달 띄우는 함수
  const handleAccountDeleteModalOpen = () => {
    setIsModalOpen(true);
  };

  // 기존 정보/카카오에서 받아온 정보 저장
  useEffect(() => {
    if (!userInfo?.data) return;

    const { name, phoneNumber, address, addressDetail, postCode } =
      userInfo.data;

    setUserName(name);
    setPhoneNumber(phoneNumber);
    setAddress(address);
    setAddressDetail(addressDetail);
    if (postCode) setPostCode(postCode);
  }, [userInfo]);

  useEffect(() => {
    if (
      !!userName &&
      !!phoneNumber &&
      !!address &&
      !!postCode &&
      !userNameErrorMessage &&
      !phoneNumberErrorMessage &&
      !addressErrorMessage
    ) {
      setButtonActive(true);
    } else if (buttonActive) {
      setButtonActive(false);
    }
  }, [userName, phoneNumber, address, postCode, userNameErrorMessage, phoneNumberErrorMessage, addressErrorMessage]);

  // 언마운트 시 모든 값 초기화
  useEffect(() => {
    return () => {
      setUserName('');
      setPhoneNumber('');
      setAddress('');
      setAddressDetail('');
      setPostCode('');
      // 에러메세지
      setUserNameErrorMessage('');
      setPhoneNumberErrorMessage('');
      setAddressErrorMessage('');
      setAddressDetailErrorMessage('');
    };
  }, []);

  return (
    <>
      {isModalOpen && (
        <AccountDeleteConfirmModal onCloseModal={setIsModalOpen} />
      )}
      {!!userInfo?.data?.name && (
        <Container>
          <Title>회원정보 수정</Title>
          <UserProfileInfo
            name={{
              value: userName,
              setValue: setUserName,
              errorMessage: userNameErrorMessage,
              setErrorMessage: setUserNameErrorMessage,
            }}
            mobile={{
              value: phoneNumber,
              setValue: setPhoneNumber,
              errorMessage: phoneNumberErrorMessage,
              setErrorMessage: setPhoneNumberErrorMessage,
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
              value: postCode,
              setValue: setPostCode,
            }}
          />
          <AccountDeleteButton
            type="button"
            onClick={handleAccountDeleteModalOpen}
          >
            <span>탈퇴하기</span>
            <FiChevronRight />
          </AccountDeleteButton>
          <SubmitButton
            type="button"
            onClick={handleSubmit}
            active={buttonActive}
          >
            완료
          </SubmitButton>
        </Container>
      )}
    </>
  );
});

interface SubmitButtonProps {
  active: boolean;
}

const Container = styled.div`
  position: relative;

  @media screen and (min-width: 1024px) {
    width: 30vw;
    margin: 0 auto;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: var(--font-small);
  font-weight: 500;
  margin-bottom: 36px;
`;

const SubmitButton = styled.button<SubmitButtonProps>`
  margin-top: 64px;
  background-color: ${(props) =>
    props.active ? 'var(--color-navy)' : 'var(--color-gray200)'};
  color: var(--color-white);
  width: 100%;
  height: 37px;
`;

const AccountDeleteButton = styled.button`
  color: var(--color-gray300);
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-top: 18px;
`;
