import cartReducer from '@/features/cartSlice';
import favouritesReducer from '@/features/favouritesSlice';
import { productsApi } from '@/services/products';
import { setItem } from '@/utils/localStorage';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    favourites: favouritesReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

store.subscribe(() => {
  setItem('cart', store.getState().cart);
  setItem('favourites', store.getState().favourites);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
