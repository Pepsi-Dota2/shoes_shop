import { api } from "../lib/interceptor";
import { IRecieveDetail } from "../types/admin/recieve";

export default {
    getReceiveDetail: () => api.get("/receive-detail"),
    createReceiveDetail: (data: IRecieveDetail) => api.post("/receive-detail/create", data),
    deleteReceiveDetail: (re_id: number, pro_id: number) => api.delete(`/receive-detail/${re_id}/${pro_id}`),
};
