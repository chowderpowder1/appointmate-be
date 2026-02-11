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

export const useSubmitResetEmail = () => {
    return useMutation({
        mutationFn: async (email) => {
            const res = await axios.post('http://localhost:8080/auth/forgot-password', email,{withCredentials: true})
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

export const useSubmitResetPassword = () => {
    return useMutation({
        mutationFn: async (email) => {
            const res = await axios.post('http://localhost:8080/auth/reset-password', email,{withCredentials: true})
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

export const useGetToken = (token) => {
    return useQuery({
        queryKey: ['resetToken', token],
        queryFn: async () => {

            const min_delay = 800;
            const start = Date.now();

            const elapsed = Date.now() - start;
            const remaining = min_delay - elapsed;

            const res = await axios.get(`http://localhost:8080/auth/reset-password/${token}`);

            if(remaining >0){
                await new Promise((resolve)=> setTimeout(resolve, remaining))
            }
            return res.data;
        },
        enabled: !!token,
    })
}