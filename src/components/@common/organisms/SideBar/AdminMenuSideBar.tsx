import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { adminSideBarOpenAtom } from '../../../../store/commonUIAtom';

export default React.memo(function AdminMenuSideBar() {
  const navigate = useNavigate();

  const [isSideBarOpen, setIsSideBarOpen] = useAtom(adminSideBarOpenAtom);

  const adminMenus = [
    { name: 'Products', path: '/admin/product' },
    { name: 'Product Upload', path: '/admin/product/upload' },
    { name: 'Orders', path: '/admin/order/list' },
    { name: 'Notice', path: '/admin/notice' },
    { name: 'Notice Upload', path: '/admin/notice/upload' },
    { name: 'Q&A', path: '/admin/qna' },
    { name: 'Cart', path: '/cart' },
  ];

  const handleMenuClick = (path: string) => {
    setIsSideBarOpen(false);
    navigate(path);
  };

  return (
    <Container className={isSideBarOpen ? 'active' : ''}>
      <AdminMark>Admin</AdminMark>
      {adminMenus.map((menu) => (
        <BoldButton onClick={() => handleMenuClick(menu.path)} key={menu.name}>
          {menu.name}
        </BoldButton>
      ))}
    </Container>
  );
});

const Container = styled.div`
  width: 80vw;
  height: 100vh;
  padding: 20px calc(80vw * 0.12);
  background-color: var(--color-navy);
  color: var(--color-white);
  z-index: 9999;
  position: fixed;
  top: 0;
  right: 0;
  transform: translateX(80vw);
  transition: transform 0.7s cubic-bezier(0.31, 0.82, 0.31, 1);

  &.active {
    transform: translateX(0%);
  }

  @media screen and (min-width: 1024px) {
    width: 30vw;
    padding: 20px 5vw;
    transform: translateX(30vw);
  }
`;

const AdminMark = styled.div`
  display: inline-block;
  background-color: var(--color-orange);
  padding: 2px 3px 2px 2px;
  letter-spacing: normal;
  font-size: var(--font-x-micro);
  margin-bottom: 48px;
`;

const BoldButton = styled.button`
  padding: 4px 12px 4px 0;
  font-family: 'Poppins', 'Noto Sans KR', sans-serif;
  font-size: var(--font-small);
  font-weight: 500;
  letter-spacing: normal;
  display: block;
  color: var(--color-white);
`;
