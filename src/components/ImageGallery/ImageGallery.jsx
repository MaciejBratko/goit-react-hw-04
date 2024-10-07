import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({ items, onImageClick }) => {
  return (
    <div className={css.imageGalleryContainer}>
      <ul className={css.imageGalleryList}>
        {items.map((item) => (
          <ImageCard key={item.id} image={item} onClick={onImageClick} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
