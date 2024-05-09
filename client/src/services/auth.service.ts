import axios from "axios";
import { ILoginField, IRegisterField } from "../interfaces/auth.interface";

const APIAuth = axios.create({
    baseURL:`${import.meta.env.VITE_APP_BASE_API_URL}/auth`,
})

export const findExistingAccount = async (email:string) => {
    const { data } = await APIAuth.get(`/find-existing?email=${email}`);
    return data;
}

export const loginService = async (formData: ILoginField) => {
    const { data } = await APIAuth.post('/login' , formData);
    return data;
}

export const registerService = async (formData: IRegisterField) => {
    const { data } = await APIAuth.post(`/register`,formData);
    return data;
}