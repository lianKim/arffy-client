import React from 'react';
import ImageCarousel from '../@common/organisms/ImageCarousel/ImageCarousel';
import styled from 'styled-components';
import ImageWithSkeleton from '../@common/molecules/ImageWithSkeleton/ImageWithSkeleton';
import { AdminProductImage } from '../../@types/adminProduct';

interface ProductImageCarouselProps {
  imageInfoList: AdminProductImage[];
}

export default React.memo(function AdminProductImageCarousel({
  imageInfoList,
}: ProductImageCarouselProps) {
  return (
    <>
      {imageInfoList && (
        <ImageCarousel
          width="90vw"
          pcWidth="calc((100vh - 128px - 64px) * 0.66666667)"
        >
          {imageInfoList.length > 0 &&
            imageInfoList.map((imageInfo) => (
              <ImageWithSkeleton
                src={imageInfo.imageUrl}
                key={imageInfo.imageId}
              />
            ))}
        </ImageCarousel>
      )}
    </>
  );
});
