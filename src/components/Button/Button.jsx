import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ onClick, status }) {
  return (
    <button
      type="button"
      className={css.button}
      onClick={onClick}
      disabled={status}
    >
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};
