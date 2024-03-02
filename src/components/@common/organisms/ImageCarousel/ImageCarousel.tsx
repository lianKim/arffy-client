import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoTriangleLeft } from '@react-icons/all-files/go/GoTriangleLeft';

interface ImageCarouselProps {
  /** <ImageContainer><img src="" /></ImageContainer> */
  children: React.ReactNode;
  width?: string;
  pcWidth?: string;
}

export default React.memo(function ImageCarousel({
  children,
  width,
  pcWidth,
}: ImageCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <StyledSlider {...settings} width={width} pcWidth={pcWidth}>
      {children}
    </StyledSlider>
  );
});

interface StyledSliderProps {
  width?: string;
  pcWidth?: string;
}

const StyledSlider = styled(Slider as any)<StyledSliderProps>`
  width: ${(props) => props.width || '90vw'};
  height: ${(props) =>
    props.width ? `calc(${props.width} * 1.5)` : 'calc(90vw * 1.5)'};

  @media screen and (min-width: 1024px) {
    /* width: 30vw;
    height: calc(30vw * 1.5); */

    width: ${(props) => props.pcWidth || '30vw'};
    height: ${(props) =>
      props.pcWidth ? `calc(${props.pcWidth} * 1.5)` : 'calc(30vw * 1.5)'};
  }

  .slick-list {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    background: var(--color-gray100);
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-slide > div {
    width: 100%;
    height: 100%;
  }

  .slick-dots {
    bottom: 12px;

    @media screen and (min-width: 1024px) {
      bottom: 20px;
    }

    & li {
      width: 6px;
      height: 6px;
      margin: 0 4px;

      @media screen and (min-width: 1024px) {
        width: 8px;
        height: 8px;
        margin: 0 4px;
      }
    }

    & li button {
      width: 100%;
      height: 100%;
      padding: 0;
      background-color: var(--color-gray200);
      border-radius: 50%;
    }

    & li button:before {
      display: none;
    }

    & .slick-active button {
      background-color: var(--color-gray300);
    }
  }

  .slic-active {
    /*  */
  }

  .slick-track {
    width: 100%;
    height: 100%;
  }

  .slick-arrow {
    z-index: 1;

    &.slick-prev {
      left: 18px;
    }

    &.slick-next {
      right: 18px;
    }

    &::before {
      font-size: 24px;
      color: var(--color-gray200);
      opacity: 0.5;
      display: none;

      @media screen and (min-width: 1024px) {
        display: block;
      }
    }
  }
`;
