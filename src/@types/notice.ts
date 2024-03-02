import { UserApiPageInfo, UserApiSortInfo } from './userCommon';

interface NoticeDetailData {
  noticeId: number;
  title: string;
  content: string;
  topFlag: boolean;
  createdAt: string;
  imageList?: NoticeDetailImageList[];
}

interface NoticeListData {
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: UserApiSortInfo;
  pageable: UserApiPageInfo;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: NoticeDetailData[];
}

// 공지사항 목록 조회
export interface NoticeList {
  data: NoticeListData;
}

interface NoticeDetailImageList {
  imageId: number;
  imageUrl: string;
  divideId: number;
  imageType: 'NOTICE';
}

// 공지사항 상세 조회
export interface NoticeDetail {
  data: NoticeDetailData;
}
