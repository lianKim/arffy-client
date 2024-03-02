import React from 'react';
import styled from 'styled-components';

export default function InfoShopGuidePage() {
  return (
    <div>
      <Title>이용안내</Title>
      <Content>
        <Subtitle>주문 안내</Subtitle>
        <Paragraph>
          {`- 빈티지 상품의 특성상 교환 · 환불이 어려우니 신중한 구매를 부탁드립니다.
- 빈티지 상품의 경우 작은 흠집이나 얼룩이 있을 수 있습니다.
- 상품의 크기를 꼭 확인해주세요.
- 배송시 발생하는 파손은 책임지지 않습니다.
- 다른 상품과 함께 연출된 이미지가 포함되어 있습니다.`}
        </Paragraph>
        <BorderLine />
        <Subtitle>결제 안내</Subtitle>
        <Paragraph>
          {`고액결제의 경우 안전을 위해 카드사에서 확인전화를 드릴 수도 있습니다. 확인과정에서 도난 카드의 사용이나 타인 명의의 주문등 정상적인 주문이 아니라고 판단될 경우 임의로 주문을 보류 또는 취소할 수 있습니다.  

무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.  

주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.`}
        </Paragraph>
        <BorderLine />
        <Subtitle>배송 안내</Subtitle>
        <Paragraph>
          {`배송 방법 : 택배
배송 지역 : 전국지역
배송 비용 : 무료
배송 기간 : 3일 ~ 7일`}
        </Paragraph>
        <BorderLine />
        <Subtitle>반품 안내</Subtitle>
        <Paragraph>
          {`반품이 가능한 경우
- 상품을 공급 받으신 날로부터 7일이내 단, 가전제품의
  경우 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우에는 반품이 불가능합니다.
- 공급받으신 상품 및 용역의 내용이 표시.광고 내용과
  다르거나 다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그사실을 알게 된 날로부터 30일이내

반품이 불가능한 경우
- 고객님의 책임 있는 사유로 상품등이 멸실 또는 훼손된 경우. 단, 상품의 내용을 확인하기 위하여
  포장 등을 훼손한 경우는 제외
- 포장을 개봉하였거나 포장이 훼손되어 상품가치가 상실된 경우
  (예 : 가전제품, 식품, 음반 등, 단 액정화면이 부착된 노트북, LCD모니터, 디지털 카메라 등의 불량화소에
  따른 반품은 제조사 기준에 따릅니다.)
- 고객님의 사용 또는 일부 소비에 의하여 상품의 가치가 현저히 감소한 경우 단, 화장품등의 경우 시용제품을
  제공한 경우에 한 합니다.
- 시간의 경과에 의하여 재판매가 곤란할 정도로 상품등의 가치가 현저히 감소한 경우
- 복제가 가능한 상품등의 포장을 훼손한 경우
  (자세한 내용은 고객만족센터 1:1 E-MAIL상담을 이용해 주시기 바랍니다.)

교환 불가
- 모든 상품의 재고는 하나이므로 교환은 불가능합니다.

※ 고객님의 마음이 바뀌어 반품을 하실 경우 상품반송 비용은 고객님께서 부담하셔야 합니다.`}
        </Paragraph>
        <BorderLine />
        <Subtitle>환불 안내</Subtitle>
        <Paragraph>
          {`환불시 반품 가능 여부를 확인한 후 3영업일 이내에 결제 금액을 환불해 드립니다.
신용카드로 결제하신 경우는 신용카드 승인을 취소하여 결제 대금이 청구되지 않게 합니다.
(단, 신용카드 결제일자에 맞추어 대금이 청구 될수 있으면 이경우 익월 신용카드 대금청구시 카드사에서 환급처리됩니다.)`}
        </Paragraph>
      </Content>
    </div>
  );
}

const Content = styled.div`
  border: 1px solid var(--color-gray100);
  padding: 10px;
`;

const Title = styled.h2`
  font-size: var(--font-micro);
  font-weight: var(--weight-semi-bold);
  text-align: center;
  margin-bottom: 42px;
`;

const Subtitle = styled.h3`
  font-size: var(--font-x-micro);
  font-weight: var(--weight-semi-bold);
`;

const Paragraph = styled.p`
  font-size: var(--font-x-micro);
  line-height: calc(var(--font-x-micro) * 1.5);
  white-space: pre-wrap;
  margin-top: 20px;
`;

const BorderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--color-gray100);
  margin: 10px 0;
`;
