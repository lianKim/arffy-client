export interface AdminApiPageInfo {
  firstPage: boolean;
  lastPage: boolean;
  totalPage: number;
  totalElements: number;
  size: number;
  currentPage: number;
}

export interface AdminApiImageInfo {
  imageId: number;
  imageUrl: string;
  divideId: number;
  imageType: string;
}
