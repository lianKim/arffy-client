import React from 'react';
import DeliveryAddress from '../OrderDetail/DeliveryAddress';
import AdminProductInfoList from './AdminProductInfoList';
import PageTitle from '../@common/atoms/PageTitle/PageTitle';
import PaymentAmount from '../Payment/PaymentAmount';
import PaidMethod from '../OrderDetail/PaidMethod';
import { useParams } from 'react-router-dom';
import { useAdminOrderDetailData } from '../../lib/apis/adminOrderAPIs';

export default React.memo(function AdminOrderDetail() {
  const { ordersId, merchantUid } = useParams();
  const { data: adminOrderDetail } = useAdminOrderDetailData(
    ordersId || '',
    merchantUid || '',
  );

  return (
    <>
      {!!adminOrderDetail?.data && (
        <div>
          <PageTitle
            title="주문상세조회"
            subTitle={adminOrderDetail.data.merchantUid}
          />
          <DeliveryAddress
            name={adminOrderDetail.data.receiverName}
            mobile={adminOrderDetail.data.receiverPhoneNumber}
            address={adminOrderDetail.data.deliveryAddress}
            addressDetail={adminOrderDetail.data.deliveryAddressDetail}
            deliveryRequest={adminOrderDetail.data.deliveryRequestContent}
          />
          <AdminProductInfoList
            productList={adminOrderDetail.data.productList}
          />
          <PaymentAmount
            totalPrice={adminOrderDetail.data.originTotalPrice}
            totalDiscountedPrice={adminOrderDetail.data.totalDiscountPrice}
            isPaid
          />
          <PaidMethod
            pgProvider={adminOrderDetail.data.pgProvider}
            payMethod={adminOrderDetail.data.payMethod}
          />
        </div>
      )}
    </>
  );
});
