import {
  validateContent,
  validateImages,
  validateTitle,
} from './validateValues';

test('validate content for notice: success', () => {
  const result = validateTitle('제목 있음');
  expect(result).toBe('');
});

test('validate content for notice: success', () => {
  const result = validateContent('내용도 있음', []);
  expect(result).toBe('');
});

test('validate images for notice: success', () => {
  const result = validateImages([
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1KihB%2FbtrutlWhx7i%2FwKrGkp6JGh8xQRvKjsxk41%2Fimg.png',
  ]);
  expect(result).toBe('');
});

test('validate content for notice: fail:: empty title', () => {
  const result = validateTitle('');
  expect(result).toBe('제목을 입력해주세요');
});

test('validate content for notice: fail:: empty content', () => {
  const result = validateContent('', []);
  expect(result).toBe('내용을 입력하거나 이미지를 첨부해주세요');
});

test('validate images for notice: fail:: over max length', () => {
  const result = validateImages([
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1KihB%2FbtrutlWhx7i%2FwKrGkp6JGh8xQRvKjsxk41%2Fimg.png',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1KihB%2FbtrutlWhx7i%2FwKrGkp6JGh8xQRvKjsxk41%2Fimg.png',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1KihB%2FbtrutlWhx7i%2FwKrGkp6JGh8xQRvKjsxk41%2Fimg.png',
    'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F1KihB%2FbtrutlWhx7i%2FwKrGkp6JGh8xQRvKjsxk41%2Fimg.png',
  ]);
  expect(result).toBe('이미지는 최대 3장까지 첨부 가능합니다');
});
