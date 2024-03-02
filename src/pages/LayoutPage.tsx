import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/@common/organisms/Header';
import { useAtom } from 'jotai';
import { adminSideBarOpenAtom, sideBarOpenAtom } from '../store/commonUIAtom';
import MenuSideBar from '../components/@common/organisms/SideBar/MenuSideBar';
import AdminMenuSideBar from '../components/@common/organisms/SideBar/AdminMenuSideBar';
import Footer from '../components/@common/organisms/Footer';

export default function LayoutPage() {
  const [isSideBarOpen, setIsSideBarOpen] = useAtom(sideBarOpenAtom);
  const [isAdminSideBarOpen, setIsAdminSideBarOpen] =
    useAtom(adminSideBarOpenAtom);

  // 사이드 바 이외의 부분 클릭 시 사이드 바 close
  const handleSideBarClose = () => {
    setIsSideBarOpen(false);
    setIsAdminSideBarOpen(false);
  };

  return (
    <>
      <MenuSideBar />
      <AdminMenuSideBar />
      <Container
        className={`${isSideBarOpen ? 'inactive_left' : ''} ${
          isAdminSideBarOpen ? 'inactive_right' : ''
        }`}
      >
        <Header />
        <Main
          className={`${isSideBarOpen ? 'inactive_left' : ''} ${
            isAdminSideBarOpen ? 'inactive_right' : ''
          }`}
          onClick={handleSideBarClose}
        >
          <Outlet />
        </Main>
        <Footer />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  position: absolute;

  transform: translateX(0vw);
  transition: transform 0.7s cubic-bezier(0.31, 0.82, 0.31, 1);

  &.inactive_left {
    transform: translateX(80vw);
    position: fixed;
  }

  &.inactive_right {
    transform: translateX(-80vw);
    position: fixed;
  }

  @media screen and (min-width: 1024px) {
    &.inactive_left {
      transform: translateX(30vw);
      position: fixed;
    }

    &.inactive_right {
      transform: translateX(-30vw);
      position: fixed;
    }
  }
`;

const Main = styled.main`
  width: 90vw;
  margin: 0 auto;
  padding: 32px 0 40px;
  min-height: calc(100vh - 64px);

  &.inactive_left::after,
  &.inactive_right::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.7;
    z-index: 9998;
  }

  @media screen and (min-width: 1024px) {
    padding: 60px 0 80px;
    min-height: calc(100vh - 72px);
  }
`;
