import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usephCities = () => {
    return useQuery({
        queryKey:['cities'],
        queryFn: async () => {
            const res = await axios
            .get('https://psgc.gitlab.io/api/cities/');
            return res.data;
        },
    })
}