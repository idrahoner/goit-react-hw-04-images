import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { createPortal } from 'react-dom';
import { toast } from 'react-toastify';

import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import Button from 'components/Button';

const modalPortal = document.querySelector('#modal');

export default function GalleryViewer({ hits, totalHits, onLoadMore }) {
  const [modalElement, setModalElement] = useState(null);

  useEffect(() => {
    toast.success(`Hooray! We found ${totalHits} images.`);
  }, []);

  useEffect(() => {
    if (hits.length === totalHits) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
  }, [hits]);

  const openModal = id => {
    const modalElement = hits.find(element => element.id === Number(id));
    setModalElement(modalElement);
  };

  const closeModal = () => {
    setModalElement(null);
  };

  return (
    <>
      <ImageGallery hits={hits} onClick={openModal} />
      {hits.length < totalHits && <Button onClick={onLoadMore} />}
      {modalElement &&
        createPortal(
          <Modal
            largeImage={modalElement.largeImageURL}
            description={modalElement.tags}
            onClose={closeModal}
          />,
          modalPortal
        )}
    </>
  );
}

GalleryViewer.propTypes = {
  hits: PropTypes.array,
  totalHits: PropTypes.number,
  onLoadMore: PropTypes.func,
};
