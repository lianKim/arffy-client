import React from 'react';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import DeliveryAddress from './DeliveryAddress';
import PaymentAmount from '../Payment/PaymentAmount';
import ProductInfoList from './ProductInfoList';
import PaidMethod from './PaidMethod';
import { useParams } from 'react-router-dom';
import { useOrderDetailData } from '../../lib/apis/orderAPIs';

export default React.memo(function OrderDetail() {
  const { ordersId, merchantUid } = useParams();
  const { data: orderDetail } = useOrderDetailData(
    ordersId || '',
    merchantUid || '',
  );

  return (
    <>
      {orderDetail?.data && (
        <div>
          <PageTitle
            title="주문상세조회"
            subTitle={orderDetail.data.merchantUid}
          />
          <DeliveryAddress
            name={orderDetail.data.receiverName}
            mobile={orderDetail.data.receiverPhoneNumber}
            address={orderDetail.data.deliveryAddress}
            addressDetail={orderDetail.data.deliveryAddressDetail}
            deliveryRequest={orderDetail.data.deliveryRequestContent}
          />
          <ProductInfoList productList={orderDetail.data.productList} />
          <PaymentAmount
            totalPrice={orderDetail.data.originTotalPrice}
            totalDiscountedPrice={orderDetail.data.totalDiscountPrice}
            isPaid
          />
          <PaidMethod
            pgProvider={orderDetail.data.pgProvider}
            payMethod={orderDetail.data.payMethod}
          />
        </div>
      )}
    </>
  );
});
