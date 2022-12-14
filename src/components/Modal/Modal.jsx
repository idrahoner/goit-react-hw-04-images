import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { HiOutlineXCircle } from 'react-icons/hi2';
import css from './Modal.module.css';

const ESCAPE_KEY = 'Escape';

export default function Modal({ largeImage, description, onClose }) {
  useEffect(() => {
    console.log('it`s useEffect()');
    window.addEventListener('keydown', closeModal);
  }, []);

  // useEffect(() => {
  //   return window.removeEventListener('keydown', closeModal);
  // });

  const closeModal = event => {
    console.log('event: ', event);
    console.log('event.code: ', event.code);
    if (event.currentTarget === event.target || event.code === ESCAPE_KEY) {
      event.preventDefault();
      console.log('it`s condition in event');
      window.removeEventListener('keydown', closeModal);
      onClose();
    }
  };

  return (
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
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string,
  description: PropTypes.string,
  onClose: PropTypes.func,
};
