import { useQuery } from '@tanstack/react-query';

export const pxData = () => {
    return useQuery({
        queryKey:[patientData],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/auth/logout', { withCredentials : true })
        }
    })
}
