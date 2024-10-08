import { useState, useRef, useCallback } from 'react';
import { fetchImages } from '../api';

const ITEMS_PER_PAGE = 12;

export const useImageGallery = () => {
  const loadMoreBtnRef = useRef(null);
  const galleryRef = useRef(null);
  const [hits, setHits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  const waitForImagesLoaded = useCallback(async () => {
    if (!galleryRef.current) return;
    
    const newImages = galleryRef.current.querySelectorAll(
      'img:not([data-loaded="true"])'
    );

    const imageLoadPromises = Array.from(newImages).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            img.dataset.loaded = "true";
            resolve();
          } else {
            img.onload = () => {
              img.dataset.loaded = "true";
              resolve();
            };
            img.onerror = () => {
              img.dataset.loaded = "true";
              resolve();
            };
          }
        })
    );

    // Wait for all images to at least start loading and establish their dimensions
    await Promise.all(imageLoadPromises);
  }, []);

  const scrollOneScreenDown = useCallback(() => {
    const viewportHeight = window.innerHeight;
    const currentScroll = window.scrollY;
    
    window.scrollTo({
      top: currentScroll + viewportHeight,
      behavior: "smooth"
    });
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);

    try {
      const newPage = page + 1;
      const newHits = await fetchImages(searchTerm, newPage, ITEMS_PER_PAGE);

      setHits((prevHits) => [...prevHits, ...newHits]);
      setPage(newPage);
      setCanLoadMore(newHits.length === ITEMS_PER_PAGE);

      // Wait for the DOM to update with new images
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Wait for new images to establish their dimensions
      await waitForImagesLoaded();
      
      // Scroll down by one viewport height
      scrollOneScreenDown();

    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return {
    hits,
    loading,
    error,
    canLoadMore,
    selectedImage,
    loadMoreBtnRef,
    galleryRef, // New ref to attach to the gallery container
    handleSearchSubmit,
    handleLoadMore,
    handleImageClick,
    closeModal,
  };
};