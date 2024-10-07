const ImageCard = ({ image, onClick }) => {
  return (
    <li>
      <div onClick={() => onClick(image)}>
        <img
          src={image.urls?.small}
          alt={image.alt_description || image.description || "Image"}
        />
      </div>
    </li>
  );
};

export default ImageCard;
