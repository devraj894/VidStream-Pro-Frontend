import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { api } from "@/lib/api";

export const registerUser = async (formData: FormData) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, formData)
        return response.data
    } catch(err){
        console.error("API Error: ", err)
        throw err
    }
}