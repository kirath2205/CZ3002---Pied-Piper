import { UserWithPW } from '@/interfaces/User';
import { OrganizationWithPW } from '@/interfaces/Organization';
import api from '@/services/api';
import { ERROR_CODES_REGISTER, CustomError, ERROR_CODES_LOGIN } from '@/utils/constants/errorCodes';

const register = async (account: UserWithPW | OrganizationWithPW) => {
    const response = await api.post(`/auth/register/`, account);
    if (ERROR_CODES_REGISTER.includes(response.status)) {
        throw CustomError(response.data);
    }
    return response.data;
};

const login = async (email: string, password: string) => {
    const response = await api.post(`/auth/login/`, { email, password });
    if (ERROR_CODES_LOGIN.includes(response.status)) {
        throw CustomError(response.data);
    }
    return response.data;
};

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

export { register, login, verifyJWT, sendVerificationEmail, sendPhoneOTP, verifyOTP };
