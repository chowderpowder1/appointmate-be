import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { users } from '../api/users';
import { getPatientData } from '../api/getPatientData';
import axios from "axios";

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

export const useGenerateOtp = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async (otpCode) => {
            console.log(otpCode)
            console.log(typeof otpCode)
            const res = await axios.post('http://localhost:8080/auth/otp', otpCode, {withCredentials: true})
            return res.data
        },
        onSuccess: () => {
            console.log('OTP Sent Successfully')
        },
        onError: () => {
            console.log('Failed to submit OTP')
        }
    })
}