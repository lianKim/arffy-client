import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NotoSansKRRegular from '../../assets/fonts/NotoSansKR-Regular.woff2';
import NotoSansKRMedium from '../../assets/fonts/NotoSansKR-Medium.woff2';
import NotoSansKRBold from '../../assets/fonts/NotoSansKR-Bold.woff2';
import PoppinsRegular from '../../assets/fonts/Poppins-Regular.woff2';
import PoppinsMedium from '../../assets/fonts/Poppins-Medium.woff2';
import PoppinsSemiBold from '../../assets/fonts/Poppins-SemiBold.woff2';
import PoppinsBold from '../../assets/fonts/Poppins-Bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  unicode-range: U+AC00- U+D7A3;
  src: local('NotoSansKR'),
    url(${NotoSansKRRegular}) format('woff2');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  unicode-range: U+AC00- U+D7A3;
  src: local('NotoSansKR'),
    url(${NotoSansKRMedium}) format('woff2');
}

@font-face {
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  unicode-range: U+AC00- U+D7A3;
  src: local('NotoSansKR'),
    url(${NotoSansKRBold}) format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  src: local('Poppins'),
    url(${PoppinsRegular}) format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  src: local('Poppins'),
    url(${PoppinsMedium}) format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  src: local('Poppins'),
    url(${PoppinsSemiBold}) format('woff2');
}

@font-face {
  font-family: 'Poppins';
  font-style: bold;
  font-display: swap;
  font-weight: 700;
  unicode-range: U+0041-005A, U+0061-007A, U+0030-0039, U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E;
  src: local('Poppins'),
    url(${PoppinsBold}) format('woff2');
}

  :root {
    /* Color */
    --color-yellow: #EDB321;
    --color-orange: #E04C1C;
    --color-navy: #0C1840;
    --color-gray100: #E8E8E8;
    --color-gray200: #CECECE;
    --color-gray300: #A7A7A7;
    --color-gray400: #707070;
    --color-black: #1C1C1C;
    --color-white: #F8F8F8;

    /* Font Size */
    --font-x-micro: 10px;
    --font-micro: 12px;
    --font-small: 14px;
    --font-regular: 15px;
    --font-medium: 16px;
    --font-large: 18px;
    --font-x-large: 20px;
    --font-2x-large: 22px;
    --font-huge: 24px;

    @media screen and (min-width: 1024px) {
       /* Font Size */
    --font-x-micro: 11px;
    --font-micro: 14px;
    --font-small: 16px;
    --font-regular: 18px;
    --font-medium: 20px;
    --font-large: 22px;
    --font-x-large: 24px;
    --font-2x-large: 28px;
    --font-huge: 32px; 
    }

    /* Font Weight */
    --weight-thin: 100;
    --weight-light: 300;
    --weight-regular: 400;
    --weight-semi-bold: 600;
    --weight-bold: 700;

    /* Border Radius */
    --size-border-radius-small: 4px;
    --size-border-radius-large: 8px;

    /* Animation */
    --animation-duration: 300ms;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  body {
    font-family: 'Poppins', 'Noto Sans KR';
    font-size: var(--font-micro);
    letter-spacing: -0.0625em;
    white-space: normal;
    /* background: var(--color-white); */
    background-color: white;
    color: var(--color-navy);
    padding: 0;
    min-height: calc(100vh + 12rem);
    min-height: -webkit-fill-available;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: 'Poppins', 'Noto Sans KR';
    /* letter-spacing: -0.0625em; */
    border: 0;
    padding: 0;
    margin: 0;
    background: none;
    font-size: var(--font-micro);
    color: var(--color-navy);
    cursor: pointer;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-navy);
  }

  input {
    font-family: 'Poppins', 'Noto Sans KR';
    height: 32px;
    color: var(--color-navy);
    border: 1px solid var(--color-gray100);
    /* background-color: var(--color-white); */
    background-color: white;
    padding: 0 8px;
    font-size: var(--font-micro);

    &::placeholder {
      color: var(--color-gray200);
    }
  }
  
  textarea {
    font-family: 'Poppins', 'Noto Sans KR';
    color: var(--color-navy);
    /* background: var(--color-white); */
    background-color: white;
    border: 1px solid var(--color-gray100);
    padding: 5px 8px;
    font-size: var(--font-micro);
    
    &::placeholder {
      color: var(--color-gray200);
    }
  }
`;

export default GlobalStyles;
