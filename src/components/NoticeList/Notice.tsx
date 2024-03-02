import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { currentNoticeIdAtom } from '../../store/noticeListAtom';
import NoticeElement from '../@common/organisms/NoticeElement/NoticeElement';
import { useNoticeDetailData } from '../../lib/apis/noticeAPIs';

interface IProps {
  title: string;
  createdAt: string;
  noticeId: number;
  topFixed?: boolean;
}

export default React.memo(function Notice({
  title,
  createdAt,
  noticeId,
  topFixed,
}: IProps) {
  const [currentNoticeId, setCurrentNoticeId] = useAtom(currentNoticeIdAtom);
  const { data: noticeDetail } = useNoticeDetailData(
    noticeId,
    Number(currentNoticeId),
  );
  // const { data: noticeDetail } = useAtomValue(noticeDetailAtom);

  // 공지사항 제목 클릭 시 open <-> close 해주는 함수
  const handleNoticeOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentNoticeId === noticeId) {
      setCurrentNoticeId(null);
    } else {
      setCurrentNoticeId(noticeId);
    }
  };

  // 언마운트 됐을 때 noticeId 초기화
  useEffect(() => {
    return () => {
      setCurrentNoticeId(null);
    };
  }, []);

  return (
    <Container>
      <NoticeElement
        title={title}
        createdAt={createdAt}
        active={currentNoticeId === noticeId}
        topFixed={topFixed}
        onClickElement={handleNoticeOpen}
      />
      {currentNoticeId === noticeId && (
        <>
          <Division />
          <ContentContainer>
            {!!noticeDetail?.data?.imageList?.length && (
              <ContentImageContainer>
                {noticeDetail.data.imageList.map((image) => (
                  <img src={image.imageUrl} key={image.imageId} />
                ))}
              </ContentImageContainer>
            )}
            <div>{noticeDetail?.data?.content}</div>
          </ContentContainer>
        </>
      )}
    </Container>
  );
});

const Container = styled.div`
  display: block;
  width: 100%;
  text-align: left;
`;

const ContentContainer = styled.div`
  padding: 48px 10px 32px 10px;
  line-height: 1.4;
  position: relative;
`;

const ContentImageContainer = styled.div`
  width: 100%;
  margin-bottom: 36px;

  & img {
    width: 100%;
    object-fit: cover;
  }

  @media screen and (min-width: 1024px) {
    width: 50vh;
  }
`;

const Division = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid var(--color-gray100);
`;
