// src/App.jsx
import { useState, useRef } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./api";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const loadMoreBtnRef = useRef(null);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Added state for selected image
  const ITEMS_PER_PAGE = 12;

  const handleSearchSubmit = async (values) => {
    setSearchTerm(values.search);
    try {
      setHits([]);
      setError(false);
      setLoading(true);
      setPage(1);
      setCanLoadMore(true);

      const searchString = values.search.toLowerCase().trim();
      const results = await fetchImages(searchString, 1, ITEMS_PER_PAGE);

      setHits(results);
      setCanLoadMore(results.length === ITEMS_PER_PAGE);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
      console.log("Query:", values.search);
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);

    try {
      const newPage = page + 1;
      const newHits = await fetchImages(searchTerm, newPage, ITEMS_PER_PAGE);

      setHits((prevHits) => [...prevHits, ...newHits]);
      setPage(newPage);
      setCanLoadMore(newHits.length === ITEMS_PER_PAGE);

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 200);

      loadMoreBtnRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); // Set selected image on click
  };

  const closeModal = () => {
    setSelectedImage(null); // Clear selected image to close modal
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage />}
      {hits.length > 0 && (
        <>
          <ImageGallery items={hits} onImageClick={handleImageClick} />
          {canLoadMore && (
            <LoadMoreBtn ref={loadMoreBtnRef} onClick={handleLoadMore} />
          )}
        </>
      )}
      {loading && <Loader />}
      <Toaster />
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </>
  );
};

export default App;
