export interface ProductType {
  id: number;
  product_name: string;
  product_value: number;
  product_stock: number;
  discount_rate: number;
  product_rating: number;
  dc_value: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  category_name: string;
  brand_id: number;
  brand_name: string;
  product_image: [{ product_card_image: string; product_explain_image: string }];
  brand_image: [{ brand_image: string }];
  favorite_count?: number;
  reviews: ProductReviewType[];
  is_wished: boolean;
  wishes: number;
}

export interface ProductCardType
  extends Pick<
    ProductType,
    | 'id'
    | 'product_name'
    | 'brand_name'
    | 'product_value'
    | 'discount_rate'
    | 'dc_value'
    | 'product_rating'
  > {
  product_image: { product_card_image: string }[];
}

export interface ProductDetailType
  extends Pick<
    ProductType,
    | 'id'
    | 'product_name'
    | 'product_value'
    | 'product_stock'
    | 'discount_rate'
    | 'product_rating'
    | 'dc_value'
    | 'category_name'
    | 'brand_name'
    | 'product_image'
    | 'brand_image'
    | 'favorite_count'
    | 'reviews'
    | 'is_wished'
    | 'wishes'
  > {}

export interface ProductCartType
  extends Pick<
    ProductType,
    | 'id'
    | 'product_name'
    | 'product_value'
    | 'discount_rate'
    | 'product_rating'
    | 'dc_value'
    | 'category_name'
    | 'brand_name'
    | 'product_image'
    | 'brand_image'
  > {}

export interface ProductReviewType {
  id: number;
  review_title: string;
  product: number;
  user: number;
  nickname: string;
  review_image: [
    {
      review_image: string;
    },
  ];
  review_keyword: [
    {
      keyword_name: string;
    },
  ];
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
}
