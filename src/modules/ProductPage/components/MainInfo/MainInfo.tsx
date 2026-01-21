import { ProductDetailsWithArticle } from '@/types/Product';
import { FC } from 'react';

import styles from './MainInfo.module.scss';
import { VariantPicker } from '../../../shared/components/VariantPicker';
import {
  normilizeColor,
  prepareCapacityVariants,
  prepareColorVariants,
  prepareProductSpecs,
} from '@/helpers/productHelpers';
import { ColorButton } from '../ColorButton';
import classNames from 'classnames';
import { CapacityButton } from '../CapacityButton';
import { Button } from '@/modules/shared/components/Button';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { CartProduct } from '@/types/CartItem';
import { SpecsList } from '@/modules/shared/components/SpecsList';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { toggle as cartToggle } from '@/features/cartSlice';
import { isProductInCart } from '@/helpers/cartHelpers';
import { isInFavourites } from '@/helpers/favouritesHelpers';
import { toggle } from '@/features/favouritesSlice';

interface Props {
  product: ProductDetailsWithArticle;
}

export const MainInfo: FC<Props> = ({ product }) => {
  const {
    article,
    color,
    capacityAvailable,
    colorsAvailable,
    namespaceId,
    capacity,
    priceRegular,
    priceDiscount,
    screen,
    ram,
    resolution,
    processor,
  } = product;
  const favourites = useAppSelector(state => state.favourites);

  const normilizedColor = normilizeColor(color);

  const colors = prepareColorVariants(namespaceId, capacity, colorsAvailable);

  const capacities = prepareCapacityVariants(
    namespaceId,
    capacityAvailable,
    color,
  );

  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);

  const toggleToCart = (product: CartProduct) => dispatch(cartToggle(product));

  const isInCart = isProductInCart(items, article);

  const inFavourites = isInFavourites(article, favourites);

  const toggleFavourite = () => dispatch(toggle(article));

  const cartProduct: CartProduct = {
    id: article,
    fullPrice: priceRegular,
    price: priceDiscount,
  };

  const specs = prepareProductSpecs({
    screen,
    resolution,
    RAM: ram,
    processor,
  });

  return (
    <div className={styles.mainDetails}>
      <div className={styles.mainDetailsTop}>
        <VariantPicker
          title="Available colors"
          variants={colors}
          renderItem={({ path, color: activeColor }) => (
            <ColorButton
              color={activeColor}
              isSelected={activeColor === normilizedColor}
              to={path}
            />
          )}
        />

        <span className={styles.productId}>ID: {article}</span>
      </div>

      <hr className={classNames(styles.splitLine, styles.mainDetailsLine)} />

      <VariantPicker
        className={styles.capacitySelect}
        title="Select capacity"
        renderItem={({ path, capacity: activeCapacity }) => (
          <CapacityButton
            capacity={activeCapacity}
            isSelected={capacity === activeCapacity}
            to={path}
          />
        )}
        variants={capacities}
      />

      <hr className={classNames(styles.splitLine, styles.mainDetailsLine)} />

      <div className={styles.productPrices}>
        <strong className={styles.productCurPrice}>
          ${priceDiscount ?? priceRegular}
        </strong>

        {priceDiscount && (
          <span className={styles.productOldPrice}>${priceRegular}</span>
        )}
      </div>

      <div className={styles.mainActions}>
        <Button
          variant="primary"
          size="large"
          isSelected={isInCart}
          className={styles.cartBtn}
          onClick={() => toggleToCart(cartProduct)}
        >
          {isInCart ? 'Added' : 'Add to cart'}
        </Button>

        <Button
          variant="outline"
          squareBtn
          size="large"
          className={styles.likeBtn}
          isSelected={inFavourites}
          onClick={toggleFavourite}
          startIcon={
            inFavourites ? <FaHeart size={16} /> : <FaRegHeart size={16} />
          }
        ></Button>
      </div>
      <div className={styles.specs}>
        <SpecsList specs={specs} valueClassname={styles.specValue} />
      </div>
    </div>
  );
};
