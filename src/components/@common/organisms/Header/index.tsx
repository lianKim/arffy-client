import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../../../assets/logo/logo_letter.svg';
import { useAtom } from 'jotai';
import {
  adminSideBarOpenAtom,
  isAdminAtom,
  sideBarOpenAtom,
} from '../../../../store/commonUIAtom';
import { HiOutlineMenu } from '@react-icons/all-files/hi/HiOutlineMenu';
import { CgShoppingBag } from '@react-icons/all-files/cg/CgShoppingBag';
import { RiAdminLine } from '@react-icons/all-files/ri/RiAdminLine';

export default React.memo(function Header() {
  const [, setIsMenuOpen] = useAtom(sideBarOpenAtom);
  const [, setIsAdminMenuOpen] = useAtom(adminSideBarOpenAtom);
  const [isAdmin] = useAtom(isAdminAtom);

  // menu side bar open
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  // admin menu side bar open
  const handleAdminMenuClick = () => {
    setIsAdminMenuOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        <IconButton type="button" onClick={handleMenuClick}>
          <HiOutlineMenu />
        </IconButton>
        <LogoContainer>
          <Link to="/">
            <img src={Logo} alt="arffy" />
          </Link>
        </LogoContainer>
        {isAdmin ? (
          // [ADMIN] open admin side bar
          <IconButton type="button" onClick={handleAdminMenuClick}>
            <RiAdminLine />
          </IconButton>
        ) : (
          // [USER] to cart page
          <Link to="/cart">
            <IconButton type="button">
              <CgShoppingBag />
            </IconButton>
          </Link>
        )}
      </Wrapper>
    </Container>
  );
});

const Container = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 90vw;
  height: 64px;
  background-color: none;
  z-index: 9990;
  margin: 0 auto;

  @media screen and (min-width: 1024px) {
    height: 72px;
  }
`;

const Wrapper = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled.div`
  cursor: pointer;
  height: 100%;

  & img {
    height: 100%;
    object-fit: cover;
  }
`;

const IconButton = styled.button`
  font-size: var(--font-large);
  color: var(--color-navy);
`;
