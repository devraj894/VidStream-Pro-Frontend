import { api } from "@/lib/api"

export const updateAccount = async ({
    fullName,
    email
} : {
    fullName: string;
    email: string;
}) => {
    const response = await api.patch('/api/users/update-account', { fullName, email });
    return response.data;
}