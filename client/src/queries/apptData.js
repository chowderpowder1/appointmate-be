import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from "react-router";

export const useGetBookedDates = (therapistId) => {
    return useQuery({
        queryKey:['apptBookedDates', therapistId],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getBookedDates', 
                {
                    params: {therapistId},
                    withCredentials: true
                }
            )
            return res.data;
        },
        // enabled: !!therapistId
    })
}

export const useBookAppt = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (appData) => {
            const res = await axios.post('http://localhost:8080/clinic/bookAppointmentForPatient', appData, {withCredentials: true})

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

export const UseGetAnAppointmentsDetails = (apptID) => {
    return useQuery({
        queryKey:['getAnAppointmentsDetails', apptID],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getApptDetails', {
                params: {apptID},
                withCredentials: true
            })
            
            return res.data;
        }, 
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