import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient  } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

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

export const useGetPatientDocumentList = () => {
    return useQuery({
        queryKey:['getPatientDocumentList'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:8080/clinic/getPatientDocumentsList', 
                {
                    withCredentials: true
                }
            )
            return res.data;
        },
        // enabled: !!therapistId
    })
}

export const usePatchInitialEval = () => {

    return useMutation({
        mutationFn: async ({id, payload}) => {
            const res =  await axios.patch(`http://localhost:8080/clinic/patchInitialEval/${id}`,
            payload,
            {withCredentials: true})
            return res.data
        },
        onSuccess: (data) => {
            console.log('Updated Successfully', data)        },
        onError:(err) => {
            console.log('Update Failed', err);
        },
    })
}
export const useUpdateDocumentStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, status}) => {
            
            const res =  await axios.patch(`http://localhost:8080/clinic/updateDocumentStatus/${id}`,
            {status},
            {withCredentials: true}
        )
            return res.data
        },
        onSuccess: (data) => {
            console.log('Updated Successfully', data)
            queryClient.invalidateQueries({queryKey: ['getPatientDocumentList']});

        },
        onError:(err) => {
            console.log('Update Failed', err);
        },
    })
}

export const useUpdateAppt = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: async (appData) => {
            const res = await axios.patch('http://localhost:8080/clinic/patchRescheduleAppt', appData, {withCredentials: true})

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

export const useGetPatientEval = (userId) => {
    return useQuery({
        queryKey:['patientEval', userId],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/clinic/getPatientEval', {
                    params: {userId},
                    withCredentials: true
            })
            return res.data;
        }
    })
}

export const useGetAllUpcomingAppts = () => {
    return useQuery({
        queryKey:['allUpcomingAppts'],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/clinic/getAllUpcomingAppts', {
                    withCredentials: true
            })
            return res.data;
        }
    })
}

export const useGetPatientsPendingAppt = (patientID) => {
    return useQuery ({
        queryKey:['patientsPendingAppt', patientID],
        queryFn: async() => {
            const res=  await axios.get('http://localhost:8080/clinic/getPatientsPendingAppointments/id', {
                params: {patientID},
                withCredentials:true
            })
            
            return res.data;
        },
        enabled: !!patientID,
    })
}

export const useGetApptDetailsOverview = (apptID) => {
    return useQuery ({
        queryKey:['getApptDetailsOverview', apptID],
        queryFn: async() => {
            const res=  await axios.get(`http://localhost:8080/appt/getApptDetails`, {
                params: {apptID},
                withCredentials:true
            })
            
            return res.data;
        },
        enabled: !!apptID,
    })
}

export const useGetApptDocuments = (id) => {
    return useQuery({
        queryKey:['getApptDocuments', id],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:8080/clinic/getApptDocuments/${id}`, 
                {
                    withCredentials: true
                }
            )
            return res.data;
        },
        enabled: !!id
    })
}