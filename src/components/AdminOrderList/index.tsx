import React from 'react';
import OrderElement from './AdminOrderElement';
import styled from 'styled-components';
import Pagination from '../@common/organisms/Pagination/Pagination';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import { Link, useSearchParams } from 'react-router-dom';
import { useAdminOrderListData } from '../../lib/apis/adminOrderAPIs';
import NoContentMessage from '../@common/organisms/NoContentMessage/NoContentMessage';

export default React.memo(function AdminOrderList() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const { data: orderList } = useAdminOrderListData(Number(page));

  return (
    <>
      {!!orderList?.data && (
        <div>
          <PageTitle title="주문배송조회" />
          {orderList.data.content.length > 0 ? (
            <>
              <ListContainer>
                {orderList.data.content.map((order) => (
                  <Link
                    to={`/admin/order/detail/${order.ordersId}/${order.merchantUid}`}
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
                totalPage={orderList.data.totalPage}
                currPage={orderList.data.currentPage}
                limit={5}
              />
            </>
          ) : (
            <NoContentMessage message="주문내역이 존재하지 않습니다." />
          )}
        </div>
      )}
    </>
  );
});

const ListContainer = styled.div``;
