import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useBarangays = (cityCode) => {
    
    return useQuery({
        queryKey:['barangays', cityCode],
        queryFn: async () => {
            const res = await axios
            .get(`https://psgc.gitlab.io/api/cities/${cityCode}/barangays/`);
            return res.data;
        },
        enabled:!!cityCode
    })
}