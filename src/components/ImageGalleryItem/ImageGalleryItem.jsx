import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webImage,
  largeImage,
  description,
}) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <li className={css.imageGalleryItem} onClick={toggleModal}>
        <img
          className={css.imageGalleryItemImage}
          src={webImage}
          alt={description}
        />
      </li>
      {showModal && (
        <Modal
          largeImage={largeImage}
          description={description}
          onClose={toggleModal}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
