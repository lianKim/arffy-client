import React, { useCallback } from 'react';
import styled from 'styled-components';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import OrderElement from './OrderElement';
import Pagination from '../@common/organisms/Pagination/Pagination';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../@common/atoms/Button/Button';
import { useOrderListData } from '../../lib/apis/orderAPIs';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function OrderList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: orderList } = useOrderListData(Number(page));

  return (
    <>
      {!!orderList?.data && (
        <div>
          <PageTitle title="주문배송조회" />
          {orderList.data.content?.length > 0 ? (
            <>
              <ListContainer>
                {orderList.data.content.map((order) => (
                  <Link
                    to={`/my/order/detail/${order.ordersId}/${order.merchantUid}`}
                    key={order.ordersId}
                  >
                    <OrderElement
                      merchantUid={order.merchantUid}
                      ordersId={order.ordersId}
                      productList={order.productList}
                    />
                  </Link>
                ))}
              </ListContainer>
              <Pagination
                totalPage={orderList.data.totalPages}
                currPage={orderList.data.pageable?.pageNumber || 0}
                limit={5}
              />
            </>
          ) : (
            <NoContentMessage message="주문내역이 존재하지 않습니다.">
              <Link to="/product">
                <Button label="쇼핑하러 가기" active primary />
              </Link>
            </NoContentMessage>
          )}
        </div>
      )}
    </>
  );
});

const ListContainer = styled.div``;
