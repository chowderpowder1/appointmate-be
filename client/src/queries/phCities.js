import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usephCities = (regionCode) => {
    return useQuery({
        queryKey: ['cities', regionCode],
        queryFn: async () => {
            // ✅ Changed from .get`` to .get()
            const res = await axios.get(`https://psgc.gitlab.io/api/regions/${regionCode}/cities-municipalities/`);
            return res.data;
        },
        enabled: !!regionCode
    })
}