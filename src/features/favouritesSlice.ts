import { Product } from '@/types/Product';
import { storage } from '@/utils/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = storage.get<Product['id'][]>('favourites', []);

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<Product['id']>) {
      const productId = action.payload;

      const existProduct = state.findIndex(id => id === productId);

      if (existProduct !== -1) {
        return state.filter(id => id !== productId);
      } else {
        state.push(productId);
      }
    },
  },
});

export const { toggle } = favouritesSlice.actions;
export default favouritesSlice.reducer;
