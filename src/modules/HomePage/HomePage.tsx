import classNames from 'classnames';
import styles from './HomePage.module.scss';

import { MainSlider } from './components/MainSlider';
import { ProductsSlider } from '../shared/components/ProductsSlider';
import { Categories } from './components/Categories';
import { useMemo } from 'react';
import { filterProducts } from '@/utils/filterProducts';
import { useGetProductsQuery } from '@/services/products';

export const HomePage = () => {
  const { data: products = [], isLoading: loading } = useGetProductsQuery();

  const newestProducts = useMemo(() => {
    return filterProducts(products, {
      yearRange: { from: 2020, to: 2025 },
    }).slice(0, 20);
  }, [products]);

  const discountProducts = useMemo(() => {
    return filterProducts(products, { withDiscount: true }).slice(0, 20);
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div>
        <h1 className={classNames(styles.title, 'container')}>
          Welcome to Nice Gadgets store!
        </h1>

        <section className={classNames(styles.sliderWrapper, 'container')}>
          <MainSlider />
        </section>
      </div>

      <div className={classNames(styles.content, 'container')}>
        <section>
          <ProductsSlider
            products={newestProducts}
            title="Brand new models"
            isLoading={loading}
            withDiscounts={false}
          />
        </section>

        <Categories products={products} isLoading={loading} />

        <section>
          <ProductsSlider
            products={discountProducts}
            title="Hot prices"
            isLoading={loading}
          />
        </section>
      </div>
    </div>
  );
};
