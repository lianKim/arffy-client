import { Component, ReactNode, ErrorInfo } from 'react';
import { CustomError } from '../../../../utils/customErrors';
import UnknownErrorFallback from '../ErrorFallback/UnknownErrorFallback';

type GlobalErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

type GlobalErrorBoundaryProps = {
  children: ReactNode;
};

export default class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false, // 오류 발생 여부를 state 상태로 저장
      error: null, // 발생한 오류의 정보를 state 상태로 저장
    };

    // this 바인딩 처리
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  /**
   * 하위 컴포넌트에서 에러 정보를 state에 저장하기 위함.
   * @param error 발생한 오류의 정보를 담고 있음
   * @returns this.state
   */
  static getDerivedStateFromError(error: Error): GlobalErrorBoundaryState {
    // 오류 상태 업데이트
    return {
      hasError: true,
      error,
    };
  }

  resetErrorBoundary(): void {
    // 에러 상태 초기화
    this.setState({
      hasError: false,
      error: null,
    });
  }

  /**
   * 오류 정보와 상세 정보를 파라미터로 얻는 함수
   * 오류 로깅 시 해당 메소드에 접근해서 로깅 가능
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo });

    if (error instanceof CustomError) {
      error.showToast();
    }
  }

  render() {
    const { state, props, resetErrorBoundary } = this;
    const { hasError, error } = state;
    const { children } = props;

    if (!hasError) {
      return children;
    }

    // 오류 발생 여부를 체크하여, 오류가 발생했을때 조건부 렌더링
    return <UnknownErrorFallback onResetError={resetErrorBoundary} />;
  }
}
