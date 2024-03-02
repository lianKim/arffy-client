import { AdminApiImageInfo, AdminApiPageInfo } from './adminCommon';

interface AdminQnaAnswerDto {
  qnaId: number | null;
  comment: string;
  imageType: 'QNA_COMMENT';
}

// [admin] Q&A 답변 등록 요청 데이터
export interface AdminQnaAnswerUploadData {
  qnaCommentDto: AdminQnaAnswerDto;
  qnaCommentImages?: File[];
}

// [admin] Q&A 답변 등록 요청 파라미터
export interface AdminQnaAnswerDeleteParams {
  qnaId: number | string;
  qnaCommentId: number | string;
}

interface AdminQnaPreview {
  qnaId: number;
  title: string;
  createdAt: string;
  isAnswered: boolean;
  qnaType: 'DELIVERY';
}

interface AdminQnaListData extends AdminApiPageInfo {
  content: AdminQnaPreview[];
}

// [admin] Q&A 전체 목록 조회
export interface AdminQnaList {
  data: AdminQnaListData;
}

interface AdminQnaQuestionImage extends AdminApiImageInfo {
  imageType: 'QNA';
}

interface AdminQnaQuestionDetailData {
  qna: {
    qnaId: number;
    title: string;
    content: string;
    createdAt: string;
    userId: number;
    email: string;
    imageList: AdminQnaQuestionImage[];
    isAnswered: boolean;
  };
  product: {
    productId: number;
    productName: string;
    price: number;
    discountPrice: number;
    discountRate: number;
    thumbnail: string;
  };
}

// [admin] Q&A 상세 (질문) 조회
export interface AdminQnaQuestionDetail {
  data: AdminQnaQuestionDetailData;
}

interface AdminQnaAnswerImage extends AdminApiImageInfo {
  imageType: 'QNA_COMMENT';
}

interface AdminQnaAnswerDetail {
  qnaId: number;
  qnaCommentId: number;
  content: string;
  createdAt: string;
  userId: number;
  email: string;
  imageList: AdminQnaAnswerImage[];
}

// [admin] Q&A 상세 (답변) 조회 데이터 (QnAAnswer[])
export interface AdminQnaAnswerDetails {
  data: AdminQnaAnswerDetail[];
}
