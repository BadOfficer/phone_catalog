import {
  Product,
  ProductDetails,
  ProductDetailsWithArticle,
} from '@/types/Product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'api' }),
  endpoints: builder => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products.json',
    }),

    getProductById: builder.query<
      ProductDetailsWithArticle | null,
      Product['itemId']
    >({
      queryFn: async (productId, _api, _extraOptions, fetch) => {
        const productsRes = await fetch('/products.json');

        if (productsRes.error) {
          return { error: productsRes.error };
        }

        const products = productsRes.data as Product[];

        const product = products.find(pr => pr.itemId === productId);

        if (!product) {
          return { data: null };
        }

        const productDetailsRes = await fetch(`/${product.category}.json`);

        if (productDetailsRes.error) {
          return { error: productDetailsRes.error };
        }

        const productDetails = productDetailsRes.data as ProductDetails[];

        const detailedProduct = productDetails.find(pr => pr.id === productId);
        if (!detailedProduct) {
          return { data: null };
        }

        return {
          data: {
            ...detailedProduct,
            article: product.id,
          },
        };
      },
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
