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

export const updateAvatar = async (formData: FormData) => {
    const response = await api.patch('/api/users/avatar', formData);
    return response.data;
}

export const updateCoverImage = async (formData: FormData) => {
    const response = await api.patch('/api/users/cover-image', formData);
    return response.data;
}

export const changePassword = async ({
    oldPassword,
    newPassword
} : {
    oldPassword: string;
    newPassword: string;
}) => {
    const response = await api.post('/api/users/change-password', { oldPassword, newPassword });
    return response.data;
}