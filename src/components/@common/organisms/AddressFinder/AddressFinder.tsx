import React, { SetStateAction } from 'react';
import DaumPostCode from 'react-daum-postcode';
import styled from 'styled-components';
import ModalFull from '../../molecules/ModalFull/ModalFull';
import { useNavigate } from 'react-router-dom';

interface AddressFinderProps {
  completeFn: (data: any) => void;
  onCloseModal?: React.Dispatch<SetStateAction<boolean>>;
}

export default React.memo(function AddressFinder({
  completeFn,
  onCloseModal,
}: AddressFinderProps) {
  const navigate = useNavigate();

  const handleModalClose = () => {
    // if (!routePath) return;
    // navigate(routePath);

    if (!onCloseModal) return;

    onCloseModal(false);
  };

  return (
    <ModalFull onClose={onCloseModal}>
      <StyledDaumPostCode
        theme={themeObj}
        onComplete={completeFn}
        onClose={handleModalClose}
      ></StyledDaumPostCode>
    </ModalFull>
  );
});

const StyledDaumPostCode = styled(DaumPostCode as any)`
  margin-top: 60px;
  height: calc(100vh - 24px) !important;
`;

// 아래 코드처럼 테마 객체를 생성합니다. (color값은 #F00, #FF0000 형식으로 입력하세요.)
// 변경되지 않는 색상의 경우 주석 또는 제거하시거나 값을 공백으로 하시면 됩니다.
var themeObj = {
  //bgColor: "", //바탕 배경색
  //searchBgColor: "", //검색창 배경색
  //contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
  //pageBgColor: "", //페이지 배경색
  textColor: '#333333', //기본 글자색
  //queryTextColor: "", //검색창 글자색
  postcodeTextColor: '#EDB321', //우편번호 글자색
  emphTextColor: '#E04C1C', //강조 글자색
  //outlineColor: "", //테두리
};
