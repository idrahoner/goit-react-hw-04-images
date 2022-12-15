import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { HiOutlineXCircle } from 'react-icons/hi2';
import css from './Modal.module.css';

const ESCAPE_KEY = 'Escape';

const modalPortal = document.querySelector('#modal-root');

export default function Modal({ largeImage, description, onClose }) {
  useEffect(() => {
    const escapeModal = event => {
      if (event.code === ESCAPE_KEY) {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', escapeModal);

    return () => {
      window.removeEventListener('keydown', escapeModal);
    };
  }, [onClose]);

  const closeModal = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={closeModal}>
      <HiOutlineXCircle
        color="white"
        size="2em"
        style={{
          position: 'absolute',
          top: '40px',
          right: '40px',
          pointerEvents: 'none',
        }}
      />
      <div className={css.modal}>
        <img src={largeImage} alt={description} />
      </div>
    </div>,
    modalPortal
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
