import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { users } from '../api/users';
import { getPatientData } from '../api/getPatientData';
import axios from "axios";

export const useSubmitLogin = () => {
    return useMutation({
        mutationFn: async (loginForm) => {
                const res = await axios.post(
                    'http://localhost:8080/auth/login', 
                    loginForm,
                    { withCredentials: true })
                    return res.data
            //     .then(res => {
            //         if (res.status===200 && res.data.redirectTo){
            //             window.location.href = res.data.redirectTo;
            //         }
            //     }
            // )
                    
                    // redirect("/");

        }, 
            onSuccess: (data) => {
            console.log('Login response:', data); // data is already JSON
        },
            onError: (error) => {
            console.error('Login error:', error);
        }
    })
}

export const useSubmitOtp = () => {
    return useMutation({
        mutationFn: async (otp) => {
            const res = await axios.post('http://localhost:8080/auth/receiveOtp', otp,{withCredentials: true})
            return res.data
        }, 
            onSuccess: (data) => {
            console.log('Login response:', data); // data is already JSON
        },
            onError: (error) => {
            console.error('Login error:', error);
        }
    })
}