import React from 'react';
import styled from 'styled-components';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../@common/organisms/Pagination/Pagination';
import CategoryBox from '../@common/molecules/CategoryBox/CategoryBox';
import QnaElement from '../@common/organisms/QnaElement/QnaElement';
import { useAdminQnaListData } from '../../lib/apis/adminQnaAPIs';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function AdminQnAList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const noAnsweredOnly = searchParams.get('no_answered');
  const { data: allQnAList } = useAdminQnaListData(
    Number(page),
    noAnsweredOnly === 'true',
  );

  const handleCategoryClick = (category: string) => {
    if (category === '미답변') {
      searchParams.set('no_answered', 'true');
    } else {
      searchParams.set('no_answered', 'false');
    }

    searchParams.set('page', '0');
    searchParams.set('offset', '0');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <PageTitle title="Q&A" />
      {!!allQnAList?.data && allQnAList.data.content.length > 0 ? (
        <ContentsContainer>
          <CategoryBoxContainer>
            <CategoryBox
              categoryList={['전체', '미답변']}
              currentCategory={noAnsweredOnly === 'true' ? '미답변' : '전체'}
              onClickCategory={handleCategoryClick}
            />
          </CategoryBoxContainer>
          <CardContainer>
            {allQnAList.data.content.map((elem) => (
              <Link to={`/admin/qna/${elem.qnaId}`} key={elem.qnaId}>
                <QnaElement
                  title={elem.title}
                  createdAt={elem.createdAt}
                  answered={elem.isAnswered}
                />
              </Link>
            ))}
          </CardContainer>
          <Pagination
            totalPage={allQnAList.data.totalPage}
            currPage={allQnAList.data.currentPage}
            limit={5}
          />
        </ContentsContainer>
      ) : (
        <NoContentMessage type="Q&A" />
      )}
    </div>
  );
});

const ContentsContainer = styled.div`
  position: relative;
  top: -24px;
`;

const CardContainer = styled.div`
  border-bottom: 1px solid var(--color-gray100);
  margin-bottom: 48px;
`;

const CategoryBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`;
