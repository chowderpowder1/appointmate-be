import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from "react-router";

export const useCreateEmployee = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (accountData) => {
            const res = await axios.post('http://localhost:8080/admin/createEmployee', accountData, {withCredentials: true})

        return res.data;
        }, 
        // onSuccess: () => {
        //     console.log('Appointment Booked Successfully')
        //     queryClient.invalidateQueries(['apptBookedDates']);
        // },
        // onError: () => {
        //     console.log('Failed to book appointment', err)
        // }
    })
}

export const useGetAllEmployees = () => {
    return useQuery({
        queryKey: ['allEmployees'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/admin/getAllEmployees', {withCredentials: true})
            return res.data;
        },
    })
}