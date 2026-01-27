import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useRegion = () => {
    return useQuery({
        queryKey: ['regions'],
        queryFn: async () => {
            const res = await axios.get('https://psgc.gitlab.io/api/regions/');
            return res.data;
        },
        staleTime: 1000 * 60 * 60,
    });
}