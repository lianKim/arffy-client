import { useAtom } from 'jotai';
import React, { useCallback } from 'react';
import { categoryAtom, stockAtom } from '../../store/adminProductListAtom';
import SubCategoryBox from '../@common/molecules/SubCategoryBox/SubCategoryBox';
import { CATEGORIES, STOCK_CATEGORIES } from '../../lib/constants/categories';
import CategoryBox from '../@common/molecules/CategoryBox/CategoryBox';
import Pagination from '../@common/organisms/Pagination/Pagination';
import styled from 'styled-components';
import ProductCard from '../@common/organisms/ProductCard/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../@common/atoms/Button/Button';
import { useAdminProductListData } from '../../lib/apis/adminProductAPIs';
import { Link } from 'react-router-dom';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function AdminProductList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const category = searchParams.get('category');
  const stock = searchParams.get('stock');

  const { data: productList } = useAdminProductListData(
    Number(page),
    category || 'all',
    stock || 'all',
  );
  const [currentCategory, setCurrentCategory] = useAtom(categoryAtom);
  const [currentStockCategory, setCurrentStockCategory] = useAtom(stockAtom);

  const handleCategoryClick = useCallback((category: string) => {
    searchParams.set('category', category.toLowerCase());
    searchParams.set('page', '0');
    searchParams.set('offset', '0');
    setSearchParams(searchParams);
  }, []);

  const handleStockCategoryClick = useCallback((category: string) => {
    searchParams.set('stock', category.replace(/ /g, '_').toLowerCase());
    searchParams.set('page', '0');
    searchParams.set('offset', '0');
    setSearchParams(searchParams);
  }, []);

  const handleUploadButtonClick = useCallback(() => {
    navigate('/admin/product/upload');
  }, []);

  return (
    <div>
      <CategoryBox
        categoryList={CATEGORIES}
        currentCategory={currentCategory}
        onClickCategory={handleCategoryClick}
      />
      <SubCategoryBox
        categoryList={STOCK_CATEGORIES}
        currentCategory={currentStockCategory}
        onClickCategory={handleStockCategoryClick}
      />
      {productList?.data && productList.data.content.length > 0 ? (
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
            totalPage={productList.data.totalPage}
            currPage={productList.data.currentPage}
            limit={5}
          />
          <Button
            label="상품 등록"
            onClick={handleUploadButtonClick}
            primary
            active
            marginTop={
              productList?.data && productList.data.content.length > 0
                ? '48px'
                : '0'
            }
          />
        </>
      ) : (
        <NoContentMessage type="상품">
          <Link to="upload">
            <Button label="등록하기" active primary />
          </Link>
        </NoContentMessage>
      )}
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
