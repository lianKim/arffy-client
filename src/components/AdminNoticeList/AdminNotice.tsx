import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { currentNoticeIdAtom } from '../../store/adminNoticeAtom';
import NoticeElement from '../@common/organisms/NoticeElement/NoticeElement';
import { useNavigate } from 'react-router-dom';
import Modal from '../@common/molecules/Modal/Modal';
import {
  useAdminNoticeDetailData,
  useNoticeDeleteMutation,
} from '../../lib/apis/adminNoticeAPIs';

interface AdminNoticeProps {
  title: string;
  createdAt: string;
  noticeId: number;
  topFixed?: boolean;
}

export default React.memo(function AdminNotice({
  title,
  createdAt,
  noticeId,
  topFixed,
}: AdminNoticeProps) {
  const navigate = useNavigate();
  const [currentNoticeId, setCurrentNoticeId] = useAtom(currentNoticeIdAtom);
  const { data: noticeDetail } = useAdminNoticeDetailData(
    noticeId,
    Number(currentNoticeId),
  );
  const { mutate: deleteNotice } = useNoticeDeleteMutation();
  // 삭제 재확인 warning 모달
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // 공지사항 제목 클릭 시 open <-> close 해주는 함수
  const handleNoticeOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (currentNoticeId === noticeId) {
        setCurrentNoticeId(null);
      } else {
        setCurrentNoticeId(noticeId);
      }
    },
    [noticeId, currentNoticeId],
  );

  // 수정 버튼 클릭 시 업로드 페이지로 이동 (기존 데이터 받아오기 위해 해당 id 전달)
  const handleEditButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate(`/admin/notice/modify?id=${noticeId}`);
  };

  // 모달 여는 함수
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  // 모달 닫는 함수
  const handleModalClose = useCallback(() => {
    setModalOpen(false);
  }, []);

  // 품절 처리 버튼 onClick 함수
  const handleDeleteButtonClick = useCallback(() => {
    deleteNotice(noticeId, {
      onSuccess: () => {
        handleModalClose();
        setCurrentNoticeId(null);
        return window.location.reload();
      },
    });
  }, [noticeId]);

  // 언마운트 됐을 때 noticeId 초기화
  useEffect(() => {
    return () => {
      setCurrentNoticeId(null);
    };
  }, []);

  return (
    <>
      {modalOpen && (
        <Modal
          onClickPrimaryButton={handleDeleteButtonClick}
          onClose={handleModalClose}
          primaryButtonText="확인"
          warning
        >
          <div>정말 삭제하시겠습니까?</div>
        </Modal>
      )}
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
              {!!noticeDetail?.data &&
                noticeDetail.data.imageList?.length > 0 && (
                  <ContentImageContainer>
                    {noticeDetail.data.imageList.map((image) => (
                      <img src={image.imageUrl} key={image.imageId} />
                    ))}
                  </ContentImageContainer>
                )}
              <div>{noticeDetail?.data.content}</div>
              <ButtonsForAdminContainer>
                <button type="button" onClick={handleEditButtonClick}>
                  수정
                </button>
                <button type="button" onClick={handleModalOpen}>
                  삭제
                </button>
              </ButtonsForAdminContainer>
            </ContentContainer>
          </>
        )}
      </Container>
    </>
  );
});

const Container = styled.div`
  display: block;
  width: 100%;
  text-align: left;
`;

const ContentContainer = styled.div`
  padding: 60px 10px 32px 10px;
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

const ButtonsForAdminContainer = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;

  & button {
    margin-left: 4px;
    padding: 2px 0px 2px 4px;
    color: var(--color-gray300);
    font-weight: 500;
  }
`;
