import { AdminApiImageInfo, AdminApiPageInfo } from './adminCommon';

interface AdminUploadDataObj {
  title: string;
  content: string;
  topFlag: boolean;
  imageType: string;
}

// [admin] 공지사항 등록 데이터
export interface AdminNoticeUploadData {
  dataObj: AdminUploadDataObj;
  imageFiles: File[];
}

interface AdminPutDataObj extends AdminUploadDataObj {
  noticeId: number;
  deleteImages?: number[];
}

// [admin] 공지사항 수정 데이터
export interface AdminNoticePutData {
  dataObj: AdminPutDataObj;
  imageFiles: File[];
}

export interface AdminNoticePreview {
  noticeId: number;
  title: string;
  content: string;
  topFlag: boolean;
  createdAt: string;
  imageList?: [];
}

interface AdminNoticeListData extends AdminApiPageInfo {
  content: AdminNoticePreview[];
}

// [admin] 공지사항 목록 조회
export interface AdminNoticeList {
  data: AdminNoticeListData;
}

interface AdminNoticeImage extends AdminApiImageInfo {
  imageType: 'NOTICE';
}

interface AdminNoticeDetailData {
  noticeId: number;
  title: string;
  content: string;
  topFlag: boolean;
  createdAt: string;
  imageList: AdminNoticeImage[];
}

// [admin] 공지사항 상세 조회
export interface AdminNoticeDetail {
  data: AdminNoticeDetailData;
}
