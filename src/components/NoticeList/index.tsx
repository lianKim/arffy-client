import React from 'react';
import styled from 'styled-components';
import Pagination from '../@common/organisms/Pagination/Pagination';
import Notice from './Notice';
import { useNoticeListData } from '../../lib/apis/noticeAPIs';
import { useSearchParams } from 'react-router-dom';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function NoticeList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: noticeList } = useNoticeListData(Number(page));

  return (
    <>
      {
        <Container>
          <Title>Notice</Title>
          {!!noticeList?.data?.content?.length ? (
            <ListContainer>
              {noticeList.data.content.map((elem) => (
                <Notice
                  title={elem.title}
                  createdAt={elem.createdAt}
                  noticeId={elem.noticeId}
                  topFixed={elem.topFlag}
                  key={elem.noticeId}
                />
              ))}
            </ListContainer>
          ) : (
            <NoContentMessage type="공지사항" />
          )}
          {noticeList && noticeList.data?.totalPages > 0 && (
            <Pagination
              totalPage={noticeList.data.totalPages}
              currPage={noticeList.data.pageable.pageNumber}
              limit={5}
            />
          )}
        </Container>
      }
    </>
  );
});

const Container = styled.div`
  /* border-bottom: 1px solid var(--color-gray100); */
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 36px;
  font-size: var(--font-small);
  letter-spacing: normal;
  font-weight: 500;
`;

const ListContainer = styled.div`
  border-bottom: 1px solid var(--color-gray100);
  margin-bottom: 48px;
`;

const NoItemMessage = styled.div`
  margin-top: 24px;
  margin-bottom: 14px;
  text-align: center;
  padding: 14px 10px;
  color: var(--color-gray200);
  border-top: 1px solid var(--color-gray100);
  border-bottom: 1px solid var(--color-gray100);
`;
