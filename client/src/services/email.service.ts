import axios from "axios";

const APIEmail = axios.create({
    baseURL:`${import.meta.env.VITE_APP_BASE_API_URL}/email`
});

export const resendVerification = async (email:string) => {
    const { data } = await APIEmail.post(`/resend`,{ email });
    return data;
}