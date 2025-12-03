import { useQuery } from '@tanstack/react-query';
import { users } from '../api/users';
import { getPatientData } from '../api/getPatientData';

// Session
export const useUsers = () => {
    return useQuery({
        queryKey:['users'],
        queryFn: users
    })
}

export const usePatientData = () => {
    return useQuery({
        queryKey:['patientData'],
        queryFn: getPatientData,
        select: (response) => response.patientData,
    })
}