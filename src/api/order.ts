import { api } from "../lib/interceptor";
import { IShippingOrder, IStatusOrder } from "../types/admin/order/order";
import { ICreateOrder } from "../types/order";

export default {
  getAllOrder: () => api.get("/orders"),
  getOrderDetail: (id: number) => api.get(`/orders/${id}`),
  getPaymentStatus: () => api.get("/admin/pending-payments"),
  getOrderPaymentStatus: () => api.get("/payments/stats"),
  createOrder: (payload: ICreateOrder) => api.post("/orders", payload),
  uploadSlip: (formdata: FormData, id: string) => {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return api.post(`/orders/${id}/payment`, formdata, config);
  },
  updateVerifyOrder: (payload: IStatusOrder, id: string) =>
    api.put(`/admin/orders/${id}/verify-payment`, payload),
  updateShippingOrder: (payload: IShippingOrder, id: string) =>
    api.put(`/admin/orders/${id}/shipping`, payload),
  bestSeller: () => api.get(`/payments/top-products`),
  viewHistoryOrderCus: (id: number) => api.get(`/customers/${id}/orders`)
};
