export interface Category {
  id: number;
  title: string;
  url: string;
  type: string;
}

export interface PriceBrands {
  id: number;
  priority: number;
  categoryKey: string;
  title: string;
  parentId: number;
  parentTitle: string;
}

export interface Prices {
  id: number;
  brandId: number;
  brandTitle: string;
  title: string;
  price1: number;
  price2: number;
  change: number;
}