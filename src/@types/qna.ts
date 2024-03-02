import { UserApiPageInfo, UserApiSortInfo } from './userCommon';

interface QnaQuestionDto {
  title: string;
  content: string;
  productId?: number | null;
  qnaType: string;
  imageType: 'QNA';
}

// Q&A 등록 요청 데이터
export interface QnaQuestionUploadData {
  qnaRequest: QnaQuestionDto;
  multipartFileList?: File[];
}

interface QnaPreview {
  qnaId: number;
  title: string;
  createdAt: string;
  isMine: boolean;
  isAnswered: boolean;
}

interface QnaListData {
  totalPages: number;
  totalElements: number;
  size: 0;
  content: QnaPreview[];
  number: number;
  sort: UserApiSortInfo;
  pageable: UserApiPageInfo;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 나의 Q&A 목록 조회 데이터
export interface QnaList {
  data: QnaListData;
}

interface QnaImage {
  imageId: number;
  imageUrl: string;
  divideId: number;
}

export interface QnaQuestionImage extends QnaImage {
  imageType: 'QNA';
}

export interface QnaQuestion {
  qnaId: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  email: string;
  imageList: QnaQuestionImage[];
  isAnswered: boolean;
  qnaCommentId?: number;
}

interface QnaProductInfo {
  productId: number;
  productName: string;
  price: number;
  discountPrice: number;
  discountRate: number;
  thumbnail: string;
}

interface QnaQuestionDetailData {
  qna: QnaQuestion;
  product?: QnaProductInfo;
}

// 나의 Q&A (질문) 상세 조회 데이터
export interface QnaQuestionDetail {
  data: QnaQuestionDetailData;
}

export interface QnaAnswerImage extends QnaImage {
  imageType: 'QNA_COMMENT';
}

export interface QnaAnswer {
  qnaId: number;
  qnaCommentId: number;
  content: string;
  createdAt: string;
  userId: number;
  email: string;
  imageList: QnaAnswerImage[];
}

// 나의 Q&A (답변) 상세 조회 데이터 (QnAAnswer[])
export interface QnaAnswerDetails {
  data: QnaAnswer[];
}
