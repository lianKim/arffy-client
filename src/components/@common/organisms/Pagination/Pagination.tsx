import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  totalPage: number;
  currPage: number;
  limit: number;
  onSetOffset?: React.Dispatch<React.SetStateAction<number>>;
  onSetPageToMove?: React.Dispatch<React.SetStateAction<number>>;
}

export default React.memo(function Pagination({
  totalPage,
  currPage,
  limit,
  onSetOffset,
  onSetPageToMove,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const offsetParam = searchParams.get('offset');
  const [pageNumbersArray, setPageNumbersArray] = useState<number[]>([]);

  // 이전 페이지로 이동
  const handlePrevIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const prevPage = currPage - 1;
    if (prevPage < 0) {
      return;
    }

    if (currPage % 5 === 0) {
      if (onSetOffset) {
        onSetOffset((prev) => prev - limit);
      } else {
        searchParams.set('offset', String(Number(offsetParam) - limit));
      }
    }

    if (onSetPageToMove) {
      onSetPageToMove(prevPage);
    } else {
      searchParams.set('page', String(prevPage));
      setSearchParams(searchParams);
    }
  };

  // 다음 페이지로 이동
  const handleNextIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextPage = currPage + 1;
    if (totalPage <= nextPage) {
      return;
    }

    if (currPage % 5 === 4) {
      if (onSetOffset) {
        onSetOffset((prev) => prev + limit);
      } else {
        searchParams.set('offset', String(Number(offsetParam) + limit));
      }
    }

    if (onSetPageToMove) {
      onSetPageToMove(nextPage);
    } else {
      searchParams.set('page', String(nextPage));
      setSearchParams(searchParams);
    }
  };

  // 원하는 페이지로 이동 (숫자 클릭)
  const handleNumberClick = (pageNumber: number) => {
    if (currPage === pageNumber) return;

    if (onSetPageToMove) {
      onSetPageToMove(pageNumber);
    } else {
      searchParams.set('page', String(pageNumber));
      setSearchParams(searchParams);
    }
  };

  // 컴포넌트 반복을 위한 전체 페이지 수 길이의 배열 업데이트
  useEffect(() => {
    if (totalPage < 1) return;

    setPageNumbersArray(Array.from({ length: totalPage }, (_, i) => i));
  }, [totalPage]);

  // 페이지 변경될 때마다 스크롤 위치 최상단으로
  useEffect(() => {
    return () => {
      if (onSetOffset && onSetPageToMove) return;

      window.scrollTo(0, 0);
    };
  }, [currPage]);

  return (
    <>
      {!!totalPage && pageNumbersArray.length && (
        <Container>
          <button type="button" onClick={handlePrevIconClick}>
            <FiChevronLeft size="14px" color="var(--color-navy)" />
          </button>
          {pageNumbersArray
            .slice(Number(offsetParam) || 0, Number(offsetParam) + limit)
            .map((pageNumber) => (
              <PageNumberButton
                type="button"
                key={`page_${pageNumber}`}
                onClick={() => handleNumberClick(pageNumber)}
                // className={pageNumber === currPage ? 'active' : ''}
                active={pageNumber === currPage}
              >
                {pageNumber + 1}
              </PageNumberButton>
            ))}
          <button type="button" onClick={handleNextIconClick}>
            <FiChevronRight size="14px" color="var(--color-navy)" />
          </button>
        </Container>
      )}
    </>
  );
});

interface PageNumberButtonProps {
  active: boolean;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;

  & button {
    display: flex;
    align-items: center;
  }

  @media screen {
    margin-top: 92px;
  }
`;

const PageNumberButton = styled.button<PageNumberButtonProps>`
  letter-spacing: normal;
  color: ${(props) =>
    props.active ? 'var(--color-navy)' : 'var(--color-gray300)'};
`;
