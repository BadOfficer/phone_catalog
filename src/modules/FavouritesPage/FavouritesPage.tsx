import classNames from 'classnames';
import { FavouritesBreadcrumbs } from './components/FavouritesBreadcrumbs';
import styles from './FavouritesPage.module.scss';
import { ProductsList } from '../shared/components/ProductsList';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { EmptyMessage } from '../shared/components/EmptyMessage';
import { useGetProductsQuery } from '@/services/products';
import { getProductsByIds } from '@/helpers/productHelpers';
import { useAppSelector } from '@/app/hooks';

export const FavouritesPage = () => {
  const favourites = useAppSelector(state => state.favourites);

  const {
    data: products,
    isLoading: loading,
    isError,
    refetch,
  } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: getProductsByIds(favourites, data ?? []),
      isLoading,
      isError,
    }),
  });

  return (
    <div className={classNames(styles.wrapper, 'container')}>
      <FavouritesBreadcrumbs />

      <h1 className={styles.title}>Favourites</h1>
      <span className={styles.itemsCount}>{favourites.length} items</span>

      <section className={styles.mainContent}>
        {isError && (
          <div className={styles.messageWrapper}>
            <ErrorMessage message="Something went wrong" onRetry={refetch} />
          </div>
        )}

        {!loading && !isError && products.length === 0 && (
          <div className={styles.messageWrapper}>
            <EmptyMessage message={`No favourites products`} />
          </div>
        )}

        {loading && (
          <ProductsList
            isLoading
            products={[]}
            itemsPerPage={favourites.length}
          />
        )}

        {products.length !== 0 && !loading && (
          <ProductsList products={products} itemsPerPage={favourites.length} />
        )}
      </section>
    </div>
  );
};
