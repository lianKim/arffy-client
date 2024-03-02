import React from 'react';
import styled from 'styled-components';

interface SubCategoryBoxProps {
  categoryList: string[];
  currentCategory?: string;
  onClickCategory?: (category: string) => void;
}

export default React.memo(function SubCategoryBox({
  categoryList,
  currentCategory,
  onClickCategory,
}: SubCategoryBoxProps) {
  const handleCategoryClick = (category: string) => {
    if (onClickCategory) {
      onClickCategory(category);
    }
  };

  return (
    <Container>
      {categoryList.map((category) => (
        <li key={category}>
          <Category
            type="button"
            name={category}
            onClick={() => handleCategoryClick(category)}
            active={
              category.replace(/ /g, '_').toLowerCase() === currentCategory
            }
          >
            {category}
          </Category>
        </li>
      ))}
    </Container>
  );
});

interface CategoryProps {
  active?: boolean;
}

const Container = styled.ul`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 6px;

  @media screen and (min-width: 1024px) {
    gap: 12px;
    position: relative;
    top: -22px;
    margin-top: 0;
    margin-bottom: 32px;
  }
`;

const Category = styled.button<CategoryProps>`
  font-size: var(--font-micro);
  letter-spacing: normal;
  color: var(--color-white);
  background-color: ${(props) =>
    props.active ? 'var(--color-orange)' : 'var(--color-gray200)'};
  padding: 0 4px;
`;
