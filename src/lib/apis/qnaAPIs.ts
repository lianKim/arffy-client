import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { userAxios } from './customAxios';
import {
  QnaAnswerDetails,
  QnaList,
  QnaQuestionDetail,
  QnaQuestionUploadData,
} from '../../@types/qna';
import { NUMBER_OF_QNA, NUMBER_OF_QNA_PRODUCT } from '../constants/pageSizes';

// [user] Q&A 질문 등록 API
export const uploadQnAQuestionAPI = (uploadDatas: QnaQuestionUploadData) => {
  if (!uploadDatas) return;

  const { multipartFileList, qnaRequest } = uploadDatas;
  const formData = new FormData();

  // Q&A 정보 데이터 obj 추가
  const qnaRequestData = new Blob([JSON.stringify(qnaRequest)], {
    type: 'application/json',
  });
  formData.append('qnaRequest', qnaRequestData);

  // 이미지 파일 추가
  if (multipartFileList?.length) {
    multipartFileList.forEach((file) => {
      formData.append('multipartFileList', file);
    });
  }

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = userAxios.post('api/v1/qna', formData, config);
  return res;
};
// [user] Q&A 질문 등록 mutation
export const useQnAQuestionUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['qnaQuestionUpload'],
    async (data: QnaQuestionUploadData) => {
      const res = await uploadQnAQuestionAPI(data);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          queryClient.invalidateQueries(['myQnAList']),
          queryClient.invalidateQueries(['myQnAQuestion']),
          queryClient.invalidateQueries(['myQnAAnswer']),
          queryClient.invalidateQueries(['productQnA']),
        ]);
      },
    },
  );
};

// [user] Q&A 질문 삭제 API
export const deleteQnAQuestionAPI = (qnaId: number | string) => {
  const res = userAxios.delete(`api/v1/qna/${qnaId}`);
  return res;
};
// [user] Q&A 질문 삭제 mutation
export const useQnAQuestionDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['qnaAnswerDelete'],
    async (qnaId: number | string) => {
      const res = await deleteQnAQuestionAPI(qnaId);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          // USER
          queryClient.invalidateQueries(['myQnAList']),
          queryClient.invalidateQueries(['productQnA']),
          // ADMIN
          queryClient.invalidateQueries(['allQnAList']),
        ]);
      },
    },
  );
};

// [user] 나의 Q&A 목록 조회 API
const fetchMyQnaList = (page: number): Promise<QnaList> => {
  return userAxios.get(`api/v1/qna/my?page=${page}&size=${NUMBER_OF_QNA}`);
};
// [user] 나의 Q&A 목록 조회 query
export const useMyQnaListData = (page: number = 0) => {
  return useQuery({
    queryKey: ['myQnAList', page],
    queryFn: () => fetchMyQnaList(page),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// [user] 상품별 Q&A 목록 조회 API (상품 상세 페이지에 노출)
const fetchProductQnaList = (
  page: number,
  productId: number,
): Promise<QnaList> => {
  return userAxios.get(
    `api/v1/qna/product/${productId}?page=${page}&size=${NUMBER_OF_QNA_PRODUCT}`,
  );
};
// [user] 상품별 Q&A 목록 조회 query (상품 상세 페이지에 노출)
export const useProductQnaListData = (page: number = 0, productId: number) => {
  return useQuery({
    queryKey: ['productQnA', page, productId],
    queryFn: () => fetchProductQnaList(page, productId),
    enabled: !!productId,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// [user] Q&A 질문 상세 조회 API
const fetchMyQnaQuestion = (qnaId: number): Promise<QnaQuestionDetail> => {
  return userAxios.get(`api/v1/qna/${qnaId}`);
};
// [user] Q&A 답변s 상세 조회 API
const fetchMyQnaAnswers = (qnaId: number): Promise<QnaAnswerDetails> => {
  return userAxios.get(`api/v1/qna/${qnaId}/comment`);
};
// [user] Q&A 질문, 답변s 상세 조회 query
export const useMyQnaDetailData = (qnaId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: ['myQnAQuestion', qnaId],
        queryFn: () => fetchMyQnaQuestion(qnaId),
        refetchOnWindowFocus: false,
        enabled: !!qnaId,
      },
      {
        queryKey: ['myQnAAnswer', qnaId],
        queryFn: () => fetchMyQnaAnswers(qnaId),
        refetchOnWindowFocus: false,
        enabled: !!qnaId,
      },
    ],
  });
};
