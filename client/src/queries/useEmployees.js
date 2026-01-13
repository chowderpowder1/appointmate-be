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

export const useGetApptOverview = () => {
    return useQuery({
        queryKey:['apptOverview'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/GetApptOverview', {withCredentials:true})
            return res.data
        }
    })
}

export const useGetAllAppt = () => {
    return useQuery({
        queryKey:['allAppt'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getAllApptData', {withCredentials:true})
            return res.data
        }
    })
}

export const useUpdateApptStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const res =  await axios.put('http://localhost:8080/appt/updateApptStatus', payload, {withCredentials: true})
            return res.data
        },
        onSuccess: (data) => {
            console.log('Updated Successfully', data)
            queryClient.invalidateQueries(['allAppt']);
        },
        onError:(data) => {
            console.log('Update Failed', err);
        },
    })
}

export const useGetAllPatients = () => {
    return useQuery({
        queryKey: ['getAllPatients'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/appt/getPatientsList', {withCredentials: true})
            return res.data;
        }
    })
}

export const useGetServicesList = () => {
    return useQuery({
        queryKey:['clinicServicesList'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/clinic/getServices', {withCredentials: true})
            return res.data;
        }
    })
}

export const useGetTherapists = () => {
    return useQuery({
        queryKey:['getTherapists'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/clinic/getTherapists', {withCredentials: true})
            return res.data;
        }
    })
}

export const useGetPatientData = (patientId) => {
    return useQuery({
        queryKey:['getPatientData'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/clinic/getPatientData', 
                {
                    params: {patientId},
                    withCredentials: true
                }
            )
            return res.data;
        },
        // enabled: !!therapistId
    })
}

export const useGetUserPersonalData = (userId) => {
    return useQuery({
        queryKey:['getUserPersonalData'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/clinic/getUserPersonalData', 
                {
                    params: {userId},
                    withCredentials: true
                }
            )
            return res.data;
        },
        // enabled: !!therapistId
    })
}