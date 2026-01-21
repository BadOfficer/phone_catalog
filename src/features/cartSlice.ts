import { calculateTotalPrice } from '@/helpers/cartHelpers';
import { CartItem, CartProduct } from '@/types/CartItem';
import { Product } from '@/types/Product';
import { storage } from '@/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Cart {
  items: CartItem[];
  total: number;
}

const initialCartState: Cart = storage.get<Cart>('cart', {
  items: [],
  total: 0,
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    toggle(state, action: PayloadAction<CartProduct>) {
      const product = action.payload;

      const isInCart = state.items.some(item => item.product.id === product.id);

      if (isInCart) {
        state.items = state.items.filter(
          item => item.product.id !== product.id,
        );
      } else {
        state.items.push({
          product,
          count: 1,
        });
      }

      state.total = calculateTotalPrice(state.items);
    },
    changeProductCount(
      state,
      action: PayloadAction<{
        product: CartProduct;
        newCount: number;
      }>,
    ) {
      const productData = action.payload;

      state.items = state.items.map(item => {
        return item.product.id === productData.product.id
          ? {
              ...item,
              count: productData.newCount < 1 ? 1 : productData.newCount,
            }
          : item;
      });

      state.total = calculateTotalPrice(state.items);
    },

    remove(state, action: PayloadAction<Product['id']>) {
      const existItem = state.items.some(
        item => item.product.id === action.payload,
      );

      if (existItem) {
        state.items = state.items.filter(
          item => item.product.id !== action.payload,
        );
        state.total = calculateTotalPrice(state.items);
      }
    },

    clear() {
      return {
        items: [],
        total: 0,
      };
    },
  },
});

export const { toggle, remove, changeProductCount, clear } = cartSlice.actions;

export default cartSlice.reducer;
