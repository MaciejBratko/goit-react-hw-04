import Modal from "react-modal";
import css from "./ImageModal.module.css";

const ImageModal = ({ image, onClose }) => {
  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
    >
      <span className={css.closeButton} onClick={onClose}>
        &times;
      </span>
      <img src={image?.urls.regular} alt={image?.alt_description || "Image"} />
      <p>{image?.alt_description || image?.description}</p>
    </Modal>
  );
};

export default ImageModal;
