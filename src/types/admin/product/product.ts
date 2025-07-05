export interface ICategoryItem {
  id: number;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ICategory {
  cate_id: number;
  cate_name: string;
  cate_remark: string;
}

export interface IProductItem {
  pro_id: number;
  pro_name: string;
  pro_detail: string;
  pro_qty: number;
  pro_image: string;
  cate_id: number;
  gen_id: number;
  pro_price: number;
  category: ICategory;
  brand_id?: number;
}

export interface ICreateProduct {
  pro_id: number;
  pro_name: string;
  pro_detail: string;
  pro_qty: string;
  image: string;
  cate_id: ICategoryItem;
  brand_id: IGetListBrand;
  pro_price: number;
}

export interface IGetListBrand {
  brand_id: number;
  brand_name: string;
  brand_description: string;
  brand_logo: string;
  brand_website: string;
  brand_status: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateBrand {
  brand_name: string;
  brand_description: string;
  logo: string;
  brand_website: string;
  brand_status: string;
}

