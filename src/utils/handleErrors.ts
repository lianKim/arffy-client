import axios from 'axios';
import { toast } from 'react-toastify';
import {
  ADMIN_CUSTOM_ERROR_MESSAGE,
  USER_CUSTOM_ERROR_MESSAGE,
} from '../lib/constants/errorMessages';

export const handleUserError = (error: unknown) => {
  const errorCode = axios.isAxiosError(error) && error.response?.data?.code;
  if (!errorCode) return;

  const errorMessage =
    USER_CUSTOM_ERROR_MESSAGE[errorCode] ||
    error.response?.data?.message ||
    '알 수 없는 에러가 발생하였습니다. \n관리자에게 문의해주세요.';
  toast.error(errorMessage);
};

export const handleAdminError = (error: unknown) => {
  const errorCode = axios.isAxiosError(error) && error.response?.data?.code;
  if (!errorCode) return;

  const errorMessage =
    ADMIN_CUSTOM_ERROR_MESSAGE[errorCode] ||
    error.response?.data?.message ||
    '알 수 없는 에러가 발생하였습니다. \n관리자에게 문의해주세요.';
  toast.error(errorMessage);
};
