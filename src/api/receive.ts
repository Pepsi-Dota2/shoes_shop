import { api } from "../lib/interceptor";
import { IRecieve } from "../types/admin/recieve";

export default {
    getRecieve: () => api.get("/receive"),
    getRecieveById: (id: string) => api.get(`/receive/${id}`),
    createRecieve: (data: IRecieve) => api.post("/receive/create", data),
    deleteRecieve: (id: string) => api.delete(`/receive/delete/${id}`),
    updateRecieve: (id: string, data: IRecieve) => api.put(`receive/update/${id}`, data)
}