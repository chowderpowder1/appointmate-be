import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { users } from '../api/users';
import { getPatientData } from '../api/getPatientData';
import axios from "axios";

// Session
export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: users,
        staleTime: 0,            // data always refreshes on mount // 4:27AM remove this if it causes bugs
    });
};

export const usePatientData = () => {
    return useQuery({
        queryKey:['patientData'],
        queryFn: getPatientData,
        select: (response) => response.patientData,
        staleTime: 0,
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

export const useUpdatePatientData = () => {    
    return useMutation({
        mutationFn: async (updatePatientInfo) => {
            const res = await axios.patch('http://localhost:8080/userData/updateUserData', updatePatientInfo, {withCredentials: true})
            return res.data
        },
        onSuccess: (data) => {
            console.log('Patient Information Updated')
        },
        onError: (error) => {
            console.log('Failed to update patient information')
        }
    })
}

export const useGetAllPatientsData = () => {
    return useQuery({
        queryKey:['allPatients'],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/clinic/getPatients', {
                withCredentials:true
            })
            return res.data;
        }
    })
}

export const useGetMyRecords = () => {
    return useQuery({
        queryKey:['myEvalData'],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/userData/getMyRecords', {
                withCredentials:true
            })
            return res.data;
        }
    })
}

export const useUploadAvatar = () => {    
    return useMutation({
        mutationFn: async (uploadAvatar) => {
            const res = await axios.patch('http://localhost:8080/userData/uploadAvatar', uploadAvatar, {withCredentials: true})
            return res.data
        },
        onSuccess: (data) => {
            console.log('Avatar uploaded successfully')
        },
        onError: (error) => {
            console.log('Failed to upload avatar')
        }
    })
}

export const useGetAvatar = () => {    
    return useQuery({
        queryKey:['myAvatar'],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/userData/getAvatar', {
                withCredentials:true
            })
            return res.data;
        }
    })
}

export const useUploadDocument = () => {    
    return useMutation({
        mutationFn: async (uploadDocument) => {
            const res = await axios.patch('http://localhost:8080/userData/uploadDocument', uploadDocument, {withCredentials: true})
            return res.data
        },
        onSuccess: (data) => {
            console.log('Avatar uploaded successfully')
        },
        onError: (error) => {
            console.log('Failed to upload avatar')
        }
    })
}

export const useGetMyDocumentsList = () => {    
    return useQuery({
        queryKey:['myDocumentsList'],
        queryFn: async() => {
            const res = await axios.get('http://localhost:8080/userData/getMyDocumentsList', {
                withCredentials:true
            })
            return res.data;
        }
    })
}

export const useGetDocumentSignedUrl = () => {
    return useMutation({
        mutationFn: async (documentId) => {
            const res= await axios.get('http://localhost:8080/userData/getDocumentSignedUrl', {
                params: {documentId},
                withCredentials: true
            })
            return res.data;
        }
    })
}