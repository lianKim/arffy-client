import React from 'react';
import styled from 'styled-components';

interface CategoryBoxProps {
  /** 보여줄 카테고리들 배열 */
  categoryList: string[];
  /** 현재 선택되어 있는 카테고리  */
  currentCategory?: string;
  /** 카테고리 값 업데이트 및 페이지 값 초기화 해주는 함수 */
  onClickCategory?: (category: string) => void;
}

export default React.memo(function CategoryBox({
  categoryList,
  currentCategory,
  onClickCategory,
}: CategoryBoxProps) {
  const handleCategoryClick = (category: string) => {
    if (!onClickCategory) return;
    onClickCategory(category);
  };

  return (
    <Container>
      {categoryList.map((category) => (
        <li key={category}>
          <Category
            type="button"
            name={category}
            onClick={() => handleCategoryClick(category)}
            active={category.toLowerCase() === currentCategory?.toLowerCase()}
          >
            {category}
          </Category>
        </li>
      ))}
    </Container>
  );
});

interface CategoryProps {
  active: boolean;
}

const Container = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media screen and (min-width: 1024px) {
    gap: 20px;
    margin-bottom: 32px;
  }
`;

const Category = styled.button<CategoryProps>`
  font-size: var(--font-micro);
  letter-spacing: normal;
  color: ${(props) =>
    props.active ? 'var(--color-navy)' : 'var(--color-gray200)'};
`;
