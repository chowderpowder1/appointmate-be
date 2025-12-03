import axios from "axios";
import { api } from "./apiClient.js";

export const getPatientData = async () => {
    const response = await api.get('/userData/pxData', { withCredentials: true })
    return response.data;
}