import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ hits }) {
  return (
    <ul className={css.imageGallery}>
      {hits.map(element => (
        <ImageGalleryItem
          key={element.id}
          id={element.id}
          webImage={element.webformatURL}
          largeImage={element.largeImageURL}
          description={element.tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
