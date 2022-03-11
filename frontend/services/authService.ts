import api from '@/services/api';

const verifyJWT = async (access_token: string) => {
    const response = await api.post(`/auth/verify_jwt_token/`, { access_token });
    return response.data;
};

const sendVerificationEmail = async (type: 'USER' | 'ORG', email: string) => {
    const response = await api.post(`/auth/verify_email/`, { type, email });

    return response.data;
};

const sendPhoneOTP = async (phone_number: string) => {
    await api.post(`/auth/send_otp/`, { phone_number });
};

const verifyOTP = async (phone_number: string, otp: string) => {
    const response = await api.post(`/auth/verify_otp/`, { phone_number, otp });
    return response.data;
};

export { verifyJWT, sendVerificationEmail, sendPhoneOTP, verifyOTP };
