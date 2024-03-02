import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { adminAxios } from './customAxios';
import {
  AdminQnaAnswerDeleteParams,
  AdminQnaAnswerDetails,
  AdminQnaAnswerUploadData,
  AdminQnaList,
  AdminQnaQuestionDetail,
} from '../../@types/adminQna';
import { NUMBER_OF_QNA } from '../constants/pageSizes';

// [admin] Q&A 답변 등록 API
export const uploadQnAAnswerAPI = (uploadDatas: AdminQnaAnswerUploadData) => {
  if (!uploadDatas) return;

  const { qnaCommentDto, qnaCommentImages } = uploadDatas;
  const formData = new FormData();

  // Q&A 정보 데이터 obj 추가
  const qnaRequestData = new Blob([JSON.stringify(qnaCommentDto)], {
    type: 'application/json',
  });
  formData.append('qnaCommentDto', qnaRequestData);

  // 이미지 파일 추가
  if (qnaCommentImages?.length) {
    qnaCommentImages.forEach((file) => {
      formData.append('qnaCommentImages', file);
    });
  }

  // header Content-Type 지정
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const res = adminAxios.post('qna', formData, config);
  return res;
};
// [admin] Q&A 답변 등록 mutation
export const useQnAAnswerUploadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['qnaAnswerUpload'],
    async (data: AdminQnaAnswerUploadData) => {
      const res = await uploadQnAAnswerAPI(data);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          // USER
          queryClient.invalidateQueries(['myQnAList']),
          queryClient.invalidateQueries(['myQnAQuestion']),
          queryClient.invalidateQueries(['myQnAAnswer']),
          queryClient.invalidateQueries(['productQnA']),
          // ADMIN
          queryClient.invalidateQueries(['allQnAList']),
          queryClient.invalidateQueries(['qnaQuestion']),
          queryClient.invalidateQueries(['qnaAnswer']),
        ]);
      },
    },
  );
};

// [admin] Q&A 답변 삭제 API
export const deleteQnaAnswerAPI = (
  deleteParams: AdminQnaAnswerDeleteParams,
) => {
  const { qnaId, qnaCommentId } = deleteParams;
  const res = adminAxios.delete(`qna/${qnaId}/comment/${qnaCommentId}`);
  return res;
};
// [admin] Q&A 답변 삭제 mutation
export const useQnAAnswerDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ['qnaAnswerDelete'],
    async (deleteParams: AdminQnaAnswerDeleteParams) => {
      const res = await deleteQnaAnswerAPI(deleteParams);
      return res;
    },
    {
      onSuccess: () => {
        return Promise.all([
          // USER
          queryClient.invalidateQueries(['myQnAList']),
          queryClient.invalidateQueries(['myQnAQuestion']),
          queryClient.invalidateQueries(['myQnAAnswer']),
          queryClient.invalidateQueries(['productQnA']),
          // ADMIN
          queryClient.invalidateQueries(['allQnAList']),
          queryClient.invalidateQueries(['qnaQuestion']),
          queryClient.invalidateQueries(['qnaAnswer']),
        ]);
      },
    },
  );
};

// [admin] 전체 Q&A 목록 조회 API
const fetchAdminQnaList = (
  page: number,
  isNoAnsweredOnly: boolean,
): Promise<AdminQnaList> => {
  return adminAxios.get(
    `qna?page=${page}&size=${NUMBER_OF_QNA}&isNoAnswered=${isNoAnsweredOnly}`,
  );
};
// [admin] 전체 Q&A 목록 조회 query
export const useAdminQnaListData = (
  page: number = 0,
  isNoAnsweredOnly: boolean = false,
) => {
  return useQuery({
    queryKey: ['allQnAList', page, isNoAnsweredOnly],
    queryFn: () => fetchAdminQnaList(page, isNoAnsweredOnly),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// [admin] Q&A 질문 상세 조회 API
const fetchAdminQnaQuestion = (
  qnaId: number,
): Promise<AdminQnaQuestionDetail> => {
  return adminAxios.get(`qna/${qnaId}`);
};
// [admin] Q&A 답변s 상세 조회 API
const fetchAdminQnaAnswers = (
  qnaId: number,
): Promise<AdminQnaAnswerDetails> => {
  return adminAxios.get(`qna/${qnaId}/comment`);
};
// [admin] Q&A 질문, 답변s 상세 조회 query
export const useAdminQnaDetailData = (qnaId: number) => {
  return useQueries({
    queries: [
      {
        queryKey: ['qnaQuestion', qnaId],
        queryFn: () => fetchAdminQnaQuestion(qnaId),
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ['qnaAnswer', qnaId],
        queryFn: () => fetchAdminQnaAnswers(qnaId),
        refetchOnWindowFocus: false,
      },
    ],
  });
};
