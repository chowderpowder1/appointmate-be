import { useQuery } from '@tanstack/react-query';
import { getCountries } from "@yusifaliyevpro/countries";
import axios from 'axios';

export const useCountries = () => {
    return useQuery({
        queryKey:['countries'],
        queryFn: async () => {
            const res = await axios
            .get('https://restcountries.com/v3.1/all?fields=name');
            return res.data;
        }
    })
}