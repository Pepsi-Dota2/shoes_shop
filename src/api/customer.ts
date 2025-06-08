import { api } from "../lib/interceptor";

export default {
    getAllCustomer: () => api.get("/customers"),
    deleteCustomer:(id:string) => api.delete(`/customers/${id}`)
}