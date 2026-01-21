import { useParams } from 'react-router-dom';
import { EmptyMessage } from '../shared/components/EmptyMessage';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { ProductPageBreadcrumbs } from './components/ProductPageBreadcrumbs';

import styles from './ProductPage.module.scss';
import classNames from 'classnames';
import { BackLink } from '../shared/components/BackLink';
import { Content } from './components/Content';
import { Skeleton } from '../shared/components/Skeleton';
import { ContentSkeleton } from './components/ContentSkeleton';
import { useGetProductByIdQuery } from '@/services/products';

export const ProductPage = () => {
  const { productId } = useParams<{
    productId: string;
  }>();

  const {
    data: productData,
    isLoading: loading,
    isError,
    refetch,
  } = useGetProductByIdQuery(productId || '');

  if (isError) {
    return (
      <div className={classNames('container', styles.wrapper)}>
        <div className={styles.backLinkWrapper}>
          <BackLink />
        </div>
        <div className={styles.messageWrapper}>
          <ErrorMessage message="Something went wrong..." onRetry={refetch} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={classNames('container', styles.wrapper)}>
        <div className={styles.breadcrumbs}>
          <Skeleton className={styles.breadcrumbsSkeleton} />
        </div>
        <div className={styles.backLinkWrapper}>
          <BackLink />
        </div>
        <ContentSkeleton />
      </div>
    );
  }

  if (!productData) {
    return (
      <div className={classNames('container', styles.wrapper)}>
        <div className={styles.backLinkWrapper}>
          <BackLink />
        </div>
        <div className={styles.messageWrapper}>
          <EmptyMessage message="Product not found" />
        </div>
      </div>
    );
  }

  return (
    <div className={classNames('container', styles.wrapper)}>
      <div className={styles.breadcrumbs}>
        <ProductPageBreadcrumbs
          category={productData.category}
          productName={productData.name}
        />
      </div>

      <div className={styles.backLinkWrapper}>
        <BackLink />
      </div>

      <Content product={productData} />
    </div>
  );
};
