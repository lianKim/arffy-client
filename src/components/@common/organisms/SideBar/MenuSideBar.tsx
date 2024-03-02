import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { sideBarOpenAtom } from '../../../../store/commonUIAtom';
import { FiInstagram } from '@react-icons/all-files/fi/FiInstagram';
import { useSignOutMutation } from '../../../../lib/apis/signInAPIs';

export default React.memo(function MenuSideBar() {
  const navigate = useNavigate();
  const [isSideBarOpen, setIsSideBarOpen] = useAtom(sideBarOpenAtom);
  const accessToken = localStorage.getItem('accessToken');
  const { mutate: signOut } = useSignOutMutation();

  const categoryMenus = [
    { name: 'All', path: '/product?category=all&page=0&offset=0' },
    { name: 'Pendant Lamp', path: '/product?category=pendant&page=0&offset=0' },
    { name: 'Table Lamp', path: '/product?category=table&page=0&offset=0' },
    { name: 'Wall Lamp', path: '/product?category=wall&page=0&offset=0' },
    { name: 'Etc.', path: '/product?category=etc&page=0&offset=0' },
  ];

  const boardMenus = [
    { name: 'Notice', path: '/notice' },
    { name: 'Account', path: '/my' },
  ];

  const handleMenuClick = (path: string) => {
    setIsSideBarOpen(false);
    navigate(path);
  };

  const handleLogInClick = () => {
    setIsSideBarOpen(false);
    navigate('/signin', {
      state: { prevUrl: window.location.href },
      replace: true,
    });
  };

  const handleLogOutClick = () => {
    if (!accessToken) return;

    signOut(accessToken, {
      onSettled: () => {
        localStorage.removeItem('accessToken');
        return window.location.reload();
      },
    });
  };

  return (
    <Container className={isSideBarOpen ? 'active' : ''}>
      <SignInButton
        type="button"
        onClick={!!accessToken ? handleLogOutClick : handleLogInClick}
      >
        {!!accessToken ? 'Log out' : 'Log in'}
      </SignInButton>
      {categoryMenus.map((menu) => (
        <BoldButton onClick={() => handleMenuClick(menu.path)} key={menu.name}>
          {menu.name}
        </BoldButton>
      ))}
      <RegularButtonsContainer>
        {boardMenus.map((menu) => (
          <RegularButton
            onClick={() => handleMenuClick(menu.path)}
            key={menu.name}
          >
            {menu.name}
          </RegularButton>
        ))}
      </RegularButtonsContainer>
      <SocialMediaLink
        href="https://www.instagram.com/arffy.vtg/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <StyledInstagramIcon />
        <span>arffy.vtg</span>
      </SocialMediaLink>
    </Container>
  );
});

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  padding: 20px calc(80vw * 0.12);
  background-color: var(--color-yellow);
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-80vw);
  transition: transform 0.7s cubic-bezier(0.31, 0.82, 0.31, 1);

  &.active {
    transform: translateX(0vw);
  }

  @media screen and (min-width: 1024px) {
    width: 30vw;
    padding: 20px 5vw;
    transform: translateX(-30vw);
  }
`;

const SignInButton = styled.button`
  padding: 4px 12px 4px 0;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-size: var(--font-small);
  letter-spacing: normal;
  display: block;
  margin-bottom: 48px;
`;

const BoldButton = styled.button`
  padding: 4px 12px 4px 0;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-size: var(--font-small);
  font-weight: 500;
  letter-spacing: normal;
  display: block;
`;

const RegularButtonsContainer = styled.div`
  margin: 48px 0;
`;

const RegularButton = styled.button`
  padding: 4px 12px 4px 0;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-size: var(--font-small);
  letter-spacing: normal;
  display: block;
`;

const SocialMediaLink = styled.a`
  position: absolute;
  left: calc(80vw * 0.12);
  bottom: 36px;
  padding: 4px 12px 4px 0;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-size: var(--font-small);
  color: var(--color-navy);
  letter-spacing: normal;
  display: flex;
  align-items: center;
  gap: 4px;

  @media screen and (min-width: 1024px) {
    left: 5vw;
  }
`;

const StyledInstagramIcon = styled(FiInstagram)`
  font-size: var(--font-small);
  color: var(--color-navy);
`;
