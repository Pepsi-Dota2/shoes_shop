import { IProductItem } from "./product/product";

export interface IRecieve {
    re_sprice: string;
    re_ststus: 'completed' | 'pending' | 'cancelled';
    re_date: number;
    re_time: string;
    re_remark: string | number;
}

export interface IRecieveDetail {
    re_id: number;
    pro_id: number;
    qty: string;
}

export interface RecieveDetailWithRelations {
    re_id: number;
    pro_id: number;
    qty: string;
    product: IProductItem;
    receive: IRecieve;
}


export interface RecieveDetailResponse {
    data: RecieveDetailWithRelations[];
}
