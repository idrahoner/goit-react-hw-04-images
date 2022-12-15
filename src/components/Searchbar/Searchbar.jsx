import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit, status }) {
  const [input, setInput] = useState('');

  const handleChange = event => {
    setInput(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const normalizedInput = input.trim().toLowerCase();
    if (normalizedInput) {
      onSubmit(normalizedInput);
    }
    setInput('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.searchFormButton}
          disabled={status}
        >
          <span className={css.searchFormButtonLabel}>Search</span>
          <HiMagnifyingGlass size="2em" color="inherit" />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={input}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  status: PropTypes.bool,
};
