import { useDebounce } from '@/hooks/useDebounce';
import { FC, useEffect, useState } from 'react';
import { Modal } from '@/modules/shared/components/Modal';

import styles from './Search.module.scss';
import { IoClose } from 'react-icons/io5';
import { SearchInput } from './components/SearchInput';
import { SearchList } from './components/SearchList';
import { Message } from '../shared/components/Message';
import { useGetProductsQuery } from '@/services/products';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ITEMS_TO_SHOW = 10;

export const Search: FC<Props> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce<string>(query, 1000);

  const { data, isLoading: loading } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data = [], isLoading }) => ({
      data: data
        .filter(item =>
          item.name.toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, ITEMS_TO_SHOW),
      isLoading,
    }),
  });

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
      <Modal.Body className={styles.modalContent}>
        <div className={styles.searchBar}>
          <SearchInput
            className={styles.searchInput}
            value={query}
            onChange={setQuery}
          />
          <button className={styles.cancelBtn} onClick={onClose}>
            <IoClose size={16} />
            <span>Cancel</span>
          </button>
        </div>
        {debouncedQuery !== '' && (
          <div className={styles.mainContent}>
            {data.length === 0 && !loading ? (
              <Message>
                <Message.Description className={styles.notFoundMessage}>
                  No products founds
                </Message.Description>
              </Message>
            ) : (
              <SearchList
                products={data}
                isLoading={loading}
                itemsToLoad={ITEMS_TO_SHOW}
                className={styles.itemsList}
              />
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};
