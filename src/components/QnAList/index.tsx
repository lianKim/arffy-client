import React from 'react';
import styled from 'styled-components';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import Pagination from '../@common/organisms/Pagination/Pagination';
import Button from '../@common/atoms/Button/Button';
import { Link, useSearchParams } from 'react-router-dom';
import QnaElement from '../@common/organisms/QnaElement/QnaElement';
import { useMyQnaListData } from '../../lib/apis/qnaAPIs';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function QnAList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: myQnAList } = useMyQnaListData(Number(page));

  return (
    <>
      <PageTitle title="Q&A" />
      {myQnAList && myQnAList.data?.content?.length > 0 ? (
        <Container>
          <CardsContainer>
            {myQnAList.data.content.map((elem) => (
              <Link to={`/my/qna/${elem.qnaId}`} key={elem.qnaId}>
                <QnaElement
                  title={elem.title}
                  createdAt={elem.createdAt}
                  answered={elem.isAnswered}
                />
              </Link>
            ))}
          </CardsContainer>
          <Pagination
            totalPage={myQnAList.data.totalPages}
            currPage={myQnAList.data.pageable.pageNumber}
            limit={5}
          />
          <Link to="upload">
            <Button
              label="작성하기"
              active
              primary
              marginTop={
                myQnAList && myQnAList.data?.content?.length > 0 ? '48px' : '0'
              }
            />
          </Link>
        </Container>
      ) : (
        <NoContentMessage type="Q&A">
          <Link to="upload">
            <Button label="작성하기" active primary />
          </Link>
        </NoContentMessage>
      )}
    </>
  );
});

const Container = styled.div`
  position: relative;
`;

const CardsContainer = styled.div`
  border-bottom: 1px solid var(--color-gray100);
  margin-bottom: 24px;
`;
