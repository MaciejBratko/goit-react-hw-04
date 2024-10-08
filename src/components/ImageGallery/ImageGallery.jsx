import { forwardRef } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from "./ImageGallery.module.css"

const ImageGallery = forwardRef(({ items, onImageClick }, ref) => {
  return (
    <div ref={ref} className={css.imageGalleryContainer}>
      <ul className={css.imageGalleryList}>
        {items.map((item) => (
          <ImageCard
            key={item.id}
            image={item}
            onClick={onImageClick}
          />
        ))}
      </ul>
    </div>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;