import React from 'react';
import ImageCarousel from '../@common/organisms/ImageCarousel/ImageCarousel';
import ImageWithSkeleton from '../@common/molecules/ImageWithSkeleton/ImageWithSkeleton';

interface ProductImageCarouselProps {
  imageUrlList: string[];
}

export default React.memo(function ProductImageCarousel({
  imageUrlList,
}: ProductImageCarouselProps) {
  return (
    <>
      {imageUrlList && (
        <ImageCarousel
          width="90vw"
          pcWidth="calc((100vh - 128px - 64px) * 0.66666667)"
        >
          {imageUrlList.length > 0 &&
            imageUrlList.map((image) => (
              <ImageWithSkeleton src={image} key={image} />
            ))}
        </ImageCarousel>
      )}
    </>
  );
});
