/**
 * 한글 받침 유무 여부를 검사하는 함수
 * @param string
 * @returns boolean
 */
export const hasFinalConsonant = (string: string) => {
  // 문자열 마지막 음절의 유니코드(UTF-16)
  const charCode = string.charCodeAt(string.length - 1);
  // 유니코드의 한글 범위 내에서 해당 코드의 받침 확인
  const consonantCode = (charCode - 44032) % 28;

  return consonantCode > 0;
};
