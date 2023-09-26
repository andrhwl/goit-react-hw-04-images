import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Api from '../services/services-api';
import { Container } from './App.styled';
import Searchbar from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal/Modal';

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [per_page] = useState(12);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }

    setIsLoader(true);

    Api.apiService(searchValue, page, per_page)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          toast.error('Sorry, there are no results');
          setIsLoader(false);
          return;
        }

        setImages(prevImages => [...prevImages, ...hits]);
        setIsLoadMore(page < Math.ceil(totalHits / per_page));
        setIsLoader(false);
      })
      .catch(error => console.log(error));
  }, [searchValue, page, per_page]);

  const handleSubmitForm = value => {
    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = url => {
    setLargeImageURL(url);
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmitForm} />
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={toggleModal} />
      )}
      {isLoadMore && <Button onClick={loadMore} />}
      {isLoader && <Loader />}
      {showModal && <Modal imgLarge={largeImageURL} onClose={toggleModal} />}
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
