import React from 'react';
import styled from 'styled-components';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { useNavigate } from 'react-router-dom';
import { useUserInfoData } from '../../lib/apis/userInfoAPIs';

export default React.memo(function MyAccount() {
  const navigate = useNavigate();
  const { data: userInfo } = useUserInfoData();

  const navInfo = [
    {
      title: '주문내역 조회',
      path: '/my/order/list?page=0&offset=0',
    },
    {
      title: '나의 Q&A',
      path: '/my/qna?page=0&offset=0',
    },
    {
      title: '회원정보 수정',
      path: '/my/profile',
    },
  ];

  const handleNavButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      {userInfo?.data && (
        <div>
          <UserInfoContainer>
            <UserName>{userInfo.data.name}님</UserName>
            <UserEmail>{userInfo.data.email}</UserEmail>
          </UserInfoContainer>
          <NavButtonsContainer>
            {navInfo.map((nav) => (
              <NavButton
                onClick={() => handleNavButtonClick(nav.path)}
                key={nav.path}
              >
                <NavTitle>{nav.title}</NavTitle>
                <StyledChevronIcon />
              </NavButton>
            ))}
          </NavButtonsContainer>
        </div>
      )}
    </>
  );
});

const UserInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: var(--font-small);
  font-weight: 500;
`;

const UserEmail = styled.div`
  font-size: var(--font-x-micro);
  letter-spacing: normal;
`;

const NavButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 60px;
`;

const NavButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

const NavTitle = styled.span`
  font-weight: 500;
`;

const StyledChevronIcon = styled(FiChevronRight)`
  font-size: var(--font-small);
  color: var(--color-gray300);
`;
