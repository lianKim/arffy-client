import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AdminNoticeDetail,
  AdminNoticeList,
  AdminNoticePutData,
  AdminNoticeUploadData,
} from '../../@types/adminNotice';
import { adminAxios } from './customAxios';
import { NUMBER_OF_NOTICES } from '../constants/pageSizes';

// [admin] 공지사항 등록 API
const postNoticeAPI = async (data: AdminNoticeUploadData) => {
  if (!data) return;

  const dataObj = data.dataObj;
  const imageFileList = data.imageFiles;

  const formData = new FormData();

  // 상품 정보 데이터 obj 추가
  const noticeDtoData = new Blob([JSON.stringify(dataObj)], {
    type: 'application/json',
  });
  formData.append('noticeDto', noticeDtoData);

  // 새로 등록한 이미지 file 추가
  imageFileList.forEach((file) => {
    formData.append('noticeImages', file);
  });

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await adminAxios.post('notice', formData, config);
  return res?.data?.noticeId;
};
// [admin] 공지사항 등록 mutation
export const useNoticeUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['noticeUpload'],
    async (data: AdminNoticeUploadData) => {
      const noticeId = await postNoticeAPI(data);
      return noticeId;
    },
    {
      onSuccess: async () => {
        return Promise.all([
          queryClient.invalidateQueries(['noticeList']),
          queryClient.invalidateQueries(['noticeDetail']),
        ]);
      },
    },
  );
};

// [admin] 공지사항 수정 API
const putNoticeAPI = async (data: AdminNoticePutData) => {
  if (!data) return;

  const dataObj = data.dataObj;
  const imageFileList = data?.imageFiles;

  const formData = new FormData();

  // 상품 정보 데이터 obj 추가
  const noticeDtoData = new Blob([JSON.stringify(dataObj)], {
    type: 'application/json',
  });
  formData.append('noticeDto', noticeDtoData);

  // 이미지 file 추가
  if (imageFileList.length) {
    imageFileList.forEach((file) => {
      formData.append('noticeImages', file);
    });
  }

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = await adminAxios.put('notice', formData, config);
  return res?.data?.noticeId;
};
// [admin] 공지사항 수정 mutation
export const useNoticeModifyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['noticeModify'],
    async (data: AdminNoticePutData) => {
      const noticeId = await putNoticeAPI(data);
      return noticeId;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['noticeList']),
          queryClient.invalidateQueries(['noticeDetail']),
        ]);
      },
    },
  );
};

// [admin] 공지사항 삭제 API
const deleteNoticeAPI = async (noticeId: number) => {
  const res = await adminAxios.delete(`notice/${noticeId}`);
  return res;
};
// [admin] 공지사항 삭제 mutation
export const useNoticeDeleteMutation = () => {
  return useMutation(['noticeDelete'], async (noticeId: number) => {
    const res = await deleteNoticeAPI(noticeId);
    return res;
  });
};

// [admin] 공지사항 목록 조회 API
const fetchAdminNoticeList = (page: number): Promise<AdminNoticeList> => {
  return adminAxios.get(`notice?page=${page}&size=${NUMBER_OF_NOTICES}`);
};
// [admin] 공지사항 목록 조회 query
export const useAdminNoticeListData = (page: number) => {
  return useQuery({
    queryKey: ['noticeList', page],
    queryFn: () => fetchAdminNoticeList(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
};

// [admin] 공지사항 상세 조회 API
const fetchAdminNoticeDetail = (
  noticeId: number,
): Promise<AdminNoticeDetail> => {
  return adminAxios.get(`notice/${noticeId}`);
};
// [admin] 공지사항 상세 조회 query
export const useAdminNoticeDetailData = (
  noticeId: number,
  currentNoticeId: number,
) => {
  return useQuery({
    queryKey: ['noticeDetail', noticeId],
    queryFn: () => fetchAdminNoticeDetail(noticeId),
    enabled: !!noticeId && noticeId === currentNoticeId,
    refetchOnWindowFocus: false,
    staleTime: 300000,
  });
};
