import { useAtom } from 'jotai';
import React from 'react';
import { pageSetOffsetAtom, pageToMoveAtom } from '../../store/qnaListAtom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Pagination from '../@common/organisms/Pagination/Pagination';
import QnaElement from '../@common/organisms/QnaElement/QnaElement';
import { useProductQnaListData } from '../../lib/apis/qnaAPIs';

interface AdminProductQnAListProps {
  productId: number;
}

export default function AdminProductQnAList({
  productId,
}: AdminProductQnAListProps) {
  const [page, setQnaPage] = useAtom(pageToMoveAtom);
  const [, setQnaOffset] = useAtom(pageSetOffsetAtom);
  const { data: qnaList } = useProductQnaListData(Number(page), productId);

  return (
    <>
      <Container>
        <TitleContainer>
          <Title>Q&A</Title>
        </TitleContainer>
        {!!qnaList?.data && qnaList.data.content.length !== 0 ? (
          <>
            <CardsContainer>
              {qnaList.data.content.map((elem) => (
                <Link to={`/admin/qna/${elem.qnaId}`} key={elem.qnaId}>
                  <QnaElement
                    title={elem.title}
                    createdAt={elem.createdAt}
                    answered={elem.isAnswered}
                  />
                </Link>
              ))}
            </CardsContainer>
            <Pagination
              totalPage={qnaList.data.totalPages}
              currPage={qnaList.data.pageable.pageNumber}
              limit={5}
              onSetOffset={setQnaOffset}
              onSetPageToMove={setQnaPage}
            />
          </>
        ) : (
          <NoQnaMessage>등록된 Q&A가 없습니다.</NoQnaMessage>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 80px;

  @media screen and (min-width: 1024px) {
    margin-top: 160px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  letter-spacing: normal;
  font-weight: 500;
`;

const CardsContainer = styled.div`
  border-bottom: 1px solid var(--color-gray100);
  margin-top: 16px;
  margin-bottom: 24px;
`;

const NoQnaMessage = styled.div`
  margin-top: 14px;
  text-align: center;
  padding: 14px 10px;
  color: var(--color-gray200);
  border-top: 1px solid var(--color-gray100);
  border-bottom: 1px solid var(--color-gray100);
`;
