import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';


export const useGetBookedDates = () => {
    return useQuery({
        queryKey:['apptBookedDates'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getBookedDates', {withCredentials: true})
            return res.data;
        }
    })
}

export const useBookAppt = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (appData) => {
            const res = await axios.post('http://localhost:8080/appt/bookAppointment', appData, {withCredentials: true})

        return res.data;
        }, 
        onSuccess: () => {
            console.log('Appointment Booked Successfully')
            queryClient.invalidateQueries(['apptBookedDates']);
        },
        onError: () => {
            console.log('Failed to book appointment', err)
        }
    })

}

export const useGetMyAppointments = () => {
    return useQuery({
        queryKey:['getMyAppointments'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/userData/getMyAppointments', { withCredentials: true})

            return res.data;
        }
    })
}

export const UseGetAnAppointmentsDetails = ({apptID}) => {
    return useQuery({
        queryKey:['getAnAppointmentsDetails'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getApptDetails', {
                params: {apptID},
                withCredentials: true
            })
            return res.data;
        }
    })
}

export const useUpdateMyAppointment = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (appID) => {
            const res = await axios.patch('http://localhost:8080/appt/patientUpdateApptStatus', appID, {withCredentials: true})

        return res.data;
        }, 
        onSuccess: () => {
            console.log('Appointment Booked Successfully')
            queryClient.invalidateQueries(['apptBookedDates']);
        },
        onError: () => {
            console.log('Failed to book appointment', err)
        }
    })

}