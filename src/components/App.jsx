import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from 'components/Searchbar';
import GalleryViewer from 'components/GalleryViewer';

export function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState(false);

  const handleSearch = data => {
    setQuery(data);
  };

  const getStatus = loading => {
    setStatus(loading);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSearch} status={status} />
      <GalleryViewer query={query} getStatus={getStatus} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
