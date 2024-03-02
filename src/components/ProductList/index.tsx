import { useAtom } from 'jotai';
import React from 'react';
import { categoryAtom, pageToMoveAtom } from '../../store/productListAtom';
import CategoryBox from '../@common/molecules/CategoryBox/CategoryBox';
import { CATEGORIES } from '../../lib/constants/categories';
import Pagination from '../@common/organisms/Pagination/Pagination';
import ProductCard from '../@common/organisms/ProductCard/ProductCard';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { useProductListData } from '../../lib/apis/productAPIs';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category] = useAtom(categoryAtom);
  const [page] = useAtom(pageToMoveAtom);

  const { data: productList } = useProductListData(
    category || 'all',
    Number(page),
  );
  const [currentCategory] = useAtom(categoryAtom);

  const handleCategoryClick = (category: string) => {
    searchParams.set('category', category.toLowerCase());
    searchParams.set('page', '0');
    searchParams.set('offset', '0');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <CategoryBox
        categoryList={CATEGORIES}
        currentCategory={currentCategory}
        onClickCategory={handleCategoryClick}
      />
      {productList?.data &&
        (productList.data.content?.length > 0 ? (
          <>
            <ProductCardList>
              {productList.data.content.map((productInfo) => (
                <ProductCard
                  productId={productInfo.productId}
                  thumbnail={productInfo.thumbnail}
                  productName={productInfo.productName}
                  price={productInfo.price}
                  discountPrice={productInfo.discountPrice}
                  soldOut={productInfo.quantity < 1}
                  key={productInfo.productId}
                />
              ))}
            </ProductCardList>
            <Pagination
              totalPage={productList.data.totalPages}
              currPage={productList.data.pageable.pageNumber}
              limit={5}
            />
          </>
        ) : (
          <NoContentMessage type="상품" />
        ))}
    </div>
  );
});

const ProductCardList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px 16px;
  margin-top: 20px;
  margin-bottom: 40px;

  @media screen and (min-width: 1024px) {
    gap: 72px 24px;
  }
`;
