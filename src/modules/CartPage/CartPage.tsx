import classNames from 'classnames';
import styles from './CartPage.module.scss';
import { BackLink } from '../shared/components/BackLink';
import { CartList } from './components/CartList';
import { Summary } from './components/Summary';
import { Message } from '../shared/components/Message';
import { CartModal } from './components/CartModal';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Button } from '../shared/components/Button';
import { ROUTES } from '@/constants/routes';
import { Product } from '@/types/Product';
import { ErrorMessage } from '../shared/components/ErrorMessage';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { calculateTotalItems } from '@/helpers/cartHelpers';
import { clear } from '@/features/cartSlice';
import { useGetProductsQuery } from '@/services/products';
import { getProductsByIds } from '@/helpers/productHelpers';

export const CartPage = () => {
  const { isOpen, close, toggle } = useDisclosure(false, {
    lockScroll: true,
  });

  const { items, total } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const clearCart = () => dispatch(clear());

  const totalItems = calculateTotalItems(items);

  const productsIdsInCart = useMemo(
    () => items.map(item => item.product.id),
    [items],
  );

  const {
    data,
    isLoading: loading,
    isError,
    refetch,
  } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError }) => ({
      data: getProductsByIds(productsIdsInCart, data ?? []),
      isLoading,
      isError,
    }),
  });

  const preparedData = useMemo(() => {
    const productsCount = items.reduce(
      (acc, curItem) => {
        acc[curItem.product.id] = curItem.count;

        return acc;
      },
      {} as Record<Product['id'], number>,
    );

    return data.map(pr => ({
      product: pr,
      count: productsCount[pr.id],
    }));
  }, [items, data]);

  return (
    <div className={classNames(styles.wrapper, 'container')}>
      <div>
        <BackLink />
      </div>

      <h1 className={styles.title}>Cart</h1>

      {isError && (
        <div className={styles.messageWrapper}>
          <ErrorMessage
            message="Something went wrong"
            onRetry={refetch}
            className={styles.message}
          />
        </div>
      )}

      {items.length === 0 && !isError && (
        <div className={styles.messageWrapper}>
          <Message className={styles.message}>
            <Message.Icon>
              <img
                src="img/cart-is-empty.png"
                alt="cart is empty"
                className={styles.emptyCartImg}
              />
            </Message.Icon>
            <Message.Title>Cart is empty</Message.Title>
            <Message.Actions>
              <Button
                variant="primary"
                size="medium"
                to={ROUTES.PHONES}
                className={styles.shopBtn}
              >
                Go shopping
              </Button>
            </Message.Actions>
          </Message>
        </div>
      )}

      {!isError && items.length !== 0 && (
        <div className={styles.mainContent}>
          <section className={styles.cartList}>
            <CartList
              items={preparedData}
              isLoading={loading}
              itemsPerLoading={items.length}
            />
          </section>
          <Summary
            totalItems={totalItems}
            totalPrice={total}
            className={styles.summary}
            onCheckout={toggle}
            isLoading={loading}
          />
        </div>
      )}

      <CartModal isOpen={isOpen} closeModal={close} onSubmit={clearCart} />
    </div>
  );
};
