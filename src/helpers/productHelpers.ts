import { ROUTES } from '@/constants/routes';
import { SpecOption } from '@/modules/shared/types/SpecOption';
import { Product } from '@/types/Product';
import { getRandomValue } from './mathHelpers';

export const getProductPath = (
  namespaceId: string,
  capacity: string,
  color: string,
) => {
  return `${ROUTES.PRODUCT_DETAILS.replace('/:productId', '')}/${namespaceId}-${capacity}-${color}`.toLowerCase();
};

export const normilizeColor = (color: string) => {
  return color.replace(/[- \s]+/g, '').toLowerCase();
};

export const normilizeURLColor = (color: string) => {
  return color.replaceAll(' ', '-').toLowerCase();
};

export const prepareColorVariants = (
  namespaceId: string,
  capacity: string,
  colors: string[],
) => {
  return colors.map(c => {
    const normilizedColor = normilizeColor(c);
    const pathColor = normilizeURLColor(c);
    const path = getProductPath(namespaceId, capacity, pathColor);

    return {
      id: c,
      path,
      color: normilizedColor,
    };
  });
};

export const prepareCapacityVariants = (
  namespaceId: string,
  capacities: string[],
  color: string,
) => {
  return capacities.map(c => {
    const normilizedColor = normilizeURLColor(color);
    const path = getProductPath(namespaceId, c, normilizedColor);

    return {
      id: c,
      path,
      capacity: c,
    };
  });
};

export const prepareProductSpecs = (
  initialSpecs: Record<string, string>,
): SpecOption[] => {
  return Object.entries(initialSpecs).map(([label, value]) => ({
    id: label,
    label: label[0].toUpperCase() + label.slice(1),
    value,
  }));
};

export const getRandomProducts = (
  products: Product[],
  limit: number,
  exclude?: Product['id'],
) => {
  const generatedIds = new Set();

  generatedIds.add(exclude);
  const result = [];

  while (result.length < limit && generatedIds.size < products.length) {
    const randomValue = getRandomValue(0, products.length - 1);

    if (generatedIds.has(randomValue)) {
      continue;
    }

    generatedIds.add(randomValue);
    result.push(products[randomValue]);
  }

  return result;
};

export const getProductsByIds = (ids: Product['id'][], products: Product[]) => {
  return products.filter(item => ids.includes(item.id));
};
