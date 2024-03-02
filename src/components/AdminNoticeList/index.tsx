import React from 'react';
import styled from 'styled-components';
import AdminNotice from './AdminNotice';
import Pagination from '../@common/organisms/Pagination/Pagination';

import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../@common/atoms/Button/Button';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';
import { useAdminNoticeListData } from '../../lib/apis/adminNoticeAPIs';

export default function AdminNoticeList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: noticeList } = useAdminNoticeListData(Number(page));

  return (
    <>
      {
        <div>
          <Title>Notice</Title>
          {!!noticeList?.data && noticeList.data.content?.length > 0 ? (
            <>
              <ListContainer>
                {noticeList.data.content.map((elem) => (
                  <AdminNotice
                    title={elem.title}
                    createdAt={elem.createdAt}
                    noticeId={elem.noticeId}
                    topFixed={elem.topFlag}
                    key={elem.noticeId}
                  />
                ))}
              </ListContainer>
              <Pagination
                totalPage={noticeList.data.totalPage}
                currPage={noticeList.data.currentPage}
                limit={5}
              />
              <Link to="upload">
                <Button
                  label="작성하기"
                  active
                  primary
                  marginTop={
                    noticeList && !!noticeList.data?.content?.length
                      ? '48px'
                      : '0'
                  }
                />
              </Link>
            </>
          ) : (
            <>
              <NoContentMessage type="공지사항">
                <Link to="upload">
                  <Button label="작성하기" active primary />
                </Link>
              </NoContentMessage>
            </>
          )}
        </div>
      }
    </>
  );
}

const Title = styled.div`
  text-align: center;
  margin-bottom: 36px;
  font-size: var(--font-small);
  letter-spacing: normal;
  font-weight: 500;
`;

const ListContainer = styled.div`
  border-bottom: 1px solid var(--color-gray100);
  margin-bottom: 24px;
`;
