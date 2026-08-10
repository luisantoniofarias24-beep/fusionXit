export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: ProductCategoryImage;
}

export interface ProductCategoryImage {
  url: string;
  alt: string;
}
