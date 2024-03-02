import { useQuery } from '@tanstack/react-query';
import { userAxios } from './customAxios';
import { NoticeDetail, NoticeList } from '../../@types/notice';
import { NUMBER_OF_NOTICES } from '../constants/pageSizes';

// [user] 공지사항 목록 조회 API
const fetchNoticeList = (page: number): Promise<NoticeList> => {
  return userAxios.get(`api/v1/notice?page=${page}&size=${NUMBER_OF_NOTICES}`);
};
// [user] 공지사항 목록 조회 query
export const useNoticeListData = (page: number = 0) => {
  return useQuery({
    queryKey: ['noticeList', page],
    queryFn: () => fetchNoticeList(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
};

// [user] 공지사항 상세 조회 API
const fetchNoticeDetail = (noticeId: number): Promise<NoticeDetail> => {
  return userAxios.get(`api/v1/notice/${noticeId}`);
};
// [user] 공지사항 상세 조회 query
export const useNoticeDetailData = (
  noticeId: number,
  currentNoticeId: number,
) => {
  return useQuery({
    queryKey: ['noticeDetail', noticeId, currentNoticeId],
    queryFn: () => fetchNoticeDetail(noticeId),
    enabled: !!noticeId && noticeId === currentNoticeId,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
};
