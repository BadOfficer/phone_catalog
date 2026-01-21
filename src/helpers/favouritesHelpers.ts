import { Product } from '@/types/Product';

export const isInFavourites = (id: Product['id'], ids: Product['id'][]) => {
  return ids.includes(id);
};
