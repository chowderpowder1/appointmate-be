import axios from "axios";

export const getPatientData = async () => {
    const response = await api.get('/userData/pxData', { withCredentials: true })
    return response.data;
}