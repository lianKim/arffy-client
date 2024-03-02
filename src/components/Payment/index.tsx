import React, { useCallback, useEffect, useState } from 'react';
import DeliveryAddress from './DeliveryAddress';
import TermsAndConditions from './TermsAndConditions';
import { useAtom } from 'jotai';
import {
  deliveryRequestContentAtom,
  impCidAtom,
  orderNumberUploadDatasAtom,
  ordersIdAtom,
  payMethodAtom,
  paymentAmountAtom,
  pgAtom,
  profileUpdateCheckedAtom,
  profileUpdateDataAtom,
  receiverAddressAtom,
  receiverAddressDetailAtom,
  receiverMobileAtom,
  receiverNameAtom,
  termsCheckedAtom,
} from '../../store/paymentAtom';
import PaymentProducts from './PaymentProducts';
import PaymentAmount from './PaymentAmount';
import { RequestPayParams, RequestPayResponse } from '../../@types/imp';
import { useNavigate } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';
import {
  useOrderNumberUploadMutation,
  usePaymentInfoData,
  usePaymentVerifyMutation,
} from '../../lib/apis/paymentAPIs';
import {
  CONFIRM_URL,
  M_REDIRECT_URL,
  STORE_ID,
} from '../../lib/constants/payment';
import { toast } from 'react-toastify';
import Button from '../@common/atoms/Button/Button';
import {
  CustomError,
  PropertyRequiredError,
  ValidationError,
} from '../../utils/customErrors';
import {
  PHONE_NUMBER_REG_EXP,
  USER_NAME_REG_EXP,
} from '../../lib/constants/regExp';
import axios from 'axios';
import { useUserInfoUpdateMutation } from '../../lib/apis/userInfoAPIs';
import { InfoDataForPortOne } from '../../@types/payment';

export default React.memo(function Payment() {
  const navigate = useNavigate();
  const [buttonActive, setButtonActive] = useState<boolean>(false);

  const [amount] = useAtom(paymentAmountAtom);
  const [ordersId] = useAtom(ordersIdAtom);
  const { data: paymentInfo } = usePaymentInfoData(ordersId);

  const [receiverName] = useAtom(receiverNameAtom);
  const [receiverMobile] = useAtom(receiverMobileAtom);
  const [receiverAddress] = useAtom(receiverAddressAtom);
  const [receiverAddressDetail] = useAtom(receiverAddressDetailAtom);
  const [profileUpdateChecked] = useAtom(profileUpdateCheckedAtom);
  const [profileUpdateData] = useAtom(profileUpdateDataAtom);
  const { mutate: updateUserProfile } = useUserInfoUpdateMutation();

  const [termsChecked, setTermsChecked] = useAtom(termsCheckedAtom);
  const [deliveryRequest, setDeliveryRequest] = useAtom(
    deliveryRequestContentAtom,
  );

  const [pg, setPg] = useAtom(pgAtom);
  const [cid] = useAtom(impCidAtom);
  const [payMethod, setPayMethod] = useAtom(payMethodAtom);
  const [orderNumberUploadDatas] = useAtom(orderNumberUploadDatasAtom);
  // 결제 직전 주문 번호 사전등록 API 요청 mutation
  const { mutate: getDatasForPortone } = useOrderNumberUploadMutation();
  const { mutateAsync: verifyPayment } = usePaymentVerifyMutation();

  // 포트원 결제 요청 함수
  const requestPayment = (data: InfoDataForPortOne) => {
    // 포트원 결제 요청
    const { IMP } = window;
    if (!IMP) return;
    // 가맹점 식별하기
    IMP.init(STORE_ID);

    const portOneData: RequestPayParams = {
      ...data,
      pg: `${pg}.${cid}`,
      pay_method: payMethod,
      m_redirect_url: M_REDIRECT_URL,
      confirm_url: CONFIRM_URL,
    };

    const portOneCallback = async (res: RequestPayResponse) => {
      const { success, error_msg, imp_uid, merchant_uid, status } = res;

      const successParams = `result?imp_uid=${imp_uid}&merchant_uid=${merchant_uid}
      &imp_success=${success}`;
      const failParams = `${successParams}&error_msg=${error_msg}`;

      if (success) {
        // 백엔드 검증 요청
        verifyPayment(
          { imp_uid, merchant_uid, status },
          {
            onSuccess: () => {
              navigate(successParams);
            },
            onError: (err) => {
              if (!axios.isAxiosError(err)) {
                throw err;
              }

              const errorMessage = err?.response?.data?.message;
              navigate(`${successParams}&error_msg=${errorMessage}`);
            },
          },
        );
      } else {
        verifyPayment(
          { imp_uid, merchant_uid, status },
          {
            onSettled: () => {
              navigate(failParams);
            },
          },
        );
      }
    };

    /** 결제창 호출하기 */
    IMP.request_pay(portOneData, portOneCallback);
  };

  const validateAllValues = () => {
    if (!receiverName) {
      throw new PropertyRequiredError('배송 받으실 분의 이름');
    }

    if (!receiverMobile) {
      throw new PropertyRequiredError('배송 받으실 분의 휴대폰번호');
    }

    if (!receiverAddress) {
      throw new PropertyRequiredError('배송 받으실 주소');
    }

    if (!pg) {
      throw new ValidationError('결제수단을 선택해주세요.');
    }

    if (!termsChecked) {
      throw new ValidationError('약관에 동의해주세요.');
    }

    if (!USER_NAME_REG_EXP.test(receiverName)) {
      throw new ValidationError('이름은 2~20자의 한글/영어를 입력해주세요.');
    }

    if (!PHONE_NUMBER_REG_EXP.test(receiverMobile)) {
      throw new ValidationError('휴대폰 번호는 10~11자의 숫자를 입력해주세요.');
    }

    if (amount < 1000) {
      throw new ValidationError('1,000원 이상부터 결제 가능합니다.');
    }
  };

  const resetAllValues = useCallback(() => {
    setPg('');
    setPayMethod('');
    setTermsChecked(false);
    setDeliveryRequest('');
  }, []);

  const handlePaymentButtonClick = async () => {
    try {
      validateAllValues();
    } catch (err) {
      if (err instanceof CustomError) {
        toast.error(err.message);
      }

      throw err;
    }

    if (profileUpdateChecked) {
      updateUserProfile(profileUpdateData);
    }

    getDatasForPortone(orderNumberUploadDatas, {
      onSuccess: (data) => {
        // 결제금액 일치 여부 확인
        if (data.amount !== amount) {
          toast.error('결제 금액에 오류가 있습니다. 다시 시도해주세요.');
          return;
        }

        // 포트원 결제 요청
        requestPayment(data);
      },
    });
  };

  useEffect(() => {
    if (
      receiverName &&
      receiverMobile &&
      receiverAddress &&
      pg &&
      termsChecked
    ) {
      setButtonActive(true);
    } else if (buttonActive) {
      setButtonActive(false);
    }
  }, [receiverName, receiverMobile, receiverAddress, receiverAddressDetail, pg, termsChecked]);

  useEffect(() => {
    return () => {
      setTimeout(resetAllValues, 1000);
    };
  }, []);

  return (
    <>
      {paymentInfo?.data && (
        <div>
          <DeliveryAddress
            addressInfo={paymentInfo.data.buyerInfo}
            deliveryRequest={deliveryRequest}
          />
          <PaymentProducts productList={paymentInfo.data.productsInfo} />
          <PaymentAmount
            totalPrice={paymentInfo.data.priceInfo.originTotalPrice}
            totalDiscountedPrice={paymentInfo.data.priceInfo.totalDiscountPrice}
          />
          <PaymentMethods />
          <TermsAndConditions />
          <Button
            label="결제하기"
            onClick={handlePaymentButtonClick}
            primary
            active={buttonActive}
          />
        </div>
      )}
    </>
  );
});
