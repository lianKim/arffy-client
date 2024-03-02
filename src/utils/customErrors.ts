import { toast } from 'react-toastify';
import { hasFinalConsonant } from './checkString';

export class CustomError extends Error {
  message: string;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.showToast = this.showToast.bind(this);
  }

  showToast() {
    toast.error(this.message);
  }
}

export class ValidationError extends CustomError {
  constructor(
    message: string = '잘못된 요청입니다. \n입력값을 다시 확인해주세요.',
  ) {
    super(message);
  }
}

export class PropertyRequiredError extends ValidationError {
  property: string;
  constructor(property: string) {
    // super('No property: ' + property);
    const postposition = hasFinalConsonant(property) ? '을' : '를';
    super(`${property + postposition} 입력해주세요.`);
    this.property = property;
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = '다시 로그인해주세요.') {
    super(message);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string = '접근 권한이 없습니다.') {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = '페이지를 찾을 수 없습니다.') {
    super(message);
  }
}

export class UnknownError extends CustomError {
  constructor(
    message: string = '알 수 없는 에러가 발생하였습니다. \n관리자에게 문의해주세요.',
  ) {
    super(message);
  }
}
