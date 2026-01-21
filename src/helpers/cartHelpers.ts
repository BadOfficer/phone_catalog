import { CartItem } from '@/types/CartItem';
import { Product } from '@/types/Product';

export const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    const price = item.product.price ?? item.product.fullPrice;

    return sum + price * item.count;
  }, 0);
};
export const calculateTotalItems = (items: CartItem[] = []) => {
  return items.reduce((acc, curItem) => acc + curItem.count, 0);
};

export const isProductInCart = (
  items: CartItem[] = [],
  productId: Product['id'],
) => {
  return items.some(item => item.product.id === productId);
};
