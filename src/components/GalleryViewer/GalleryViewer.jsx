import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';

import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import { fetchImages, formatResponse } from 'service';

export default function GalleryViewer({ query, getStatus, status }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (page === 1 && totalHits) {
      toast.success(`Hooray! We found ${totalHits} images.`);
    } else if (hits.length === totalHits && totalHits) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
  }, [hits, totalHits, page]);

  useEffect(() => {
    setPage(1);
    setHits([]);
    setTotalHits(0);
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    makeRequest(searchQuery, page);
  }, [searchQuery, page]);

  const makeRequest = async (query, page) => {
    try {
      getStatus(true);
      const { hits, totalHits } = await fetchImages({ query, page });

      if (!totalHits) {
        throw new Error(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      setHits(prevState => [
        ...prevState,
        ...hits.map(element => formatResponse(element)),
      ]);
      setTotalHits(totalHits);
    } catch (error) {
      toast.error(error.message);
    } finally {
      getStatus(false);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  if (hits.length) {
    return (
      <>
        <ImageGallery hits={hits} />
        {hits.length < totalHits && (
          <Button onClick={loadMore} status={status} />
        )}
      </>
    );
  }

  if (status) {
    return <Loader />;
  }
}

GalleryViewer.propTypes = {
  query: PropTypes.string.isRequired,
  getStatus: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};
