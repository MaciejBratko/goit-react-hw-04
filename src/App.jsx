import { Suspense, lazy } from 'react';
import { useImageGallery } from "./hooks/useImageGallery";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";

const ImageModal = lazy(() => import('./components/ImageModal/ImageModal'));

Modal.setAppElement('#root');

const App = () => {
  const {
    hits,
    loading,
    error,
    canLoadMore,
    selectedImage,
    loadMoreBtnRef,
    galleryRef,  // Added this
    handleSearchSubmit,
    handleLoadMore,
    handleImageClick,
    closeModal,
  } = useImageGallery();

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage />}
      {hits.length > 0 && (
        <>
          <ImageGallery 
            ref={galleryRef}
            items={hits} 
            onImageClick={handleImageClick} 
          />
          {canLoadMore && (
            <LoadMoreBtn ref={loadMoreBtnRef} onClick={handleLoadMore} />
          )}
        </>
      )}
      {loading && <Loader />}
      <Toaster />
      {selectedImage && (
        <Suspense fallback={<Loader />}>
          <ImageModal image={selectedImage} onClose={closeModal} />
        </Suspense>
      )}
    </>
  );
};

export default App;