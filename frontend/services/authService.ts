import { UserWithPW } from '@/interfaces/User';
import { OrganizationWithPW } from '@/interfaces/Organization';
import axios from 'axios';
import { ERROR_CODES_REGISTER, CustomError } from '@/utils/constants/errorCodes';

export const URI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`;

const register = async (account: UserWithPW | OrganizationWithPW) => {
    const response = await axios.post(`${URI}/register/`, account);
    if (ERROR_CODES_REGISTER.includes(response.status)) {
        throw CustomError(response.data);
    }
    return response.data;
};

const login = async (email: string, password: string) => {
    const response = await axios.post(`${URI}/login/`, { email, password });
    return response.data;
};

const verifyJWT = async (access_token: string) => {
    const response = await axios.post(`${URI}/verify_jwt_token/`, { access_token });
    return response.data;
};

const sendVerificationEmail = async (type: 'USER' | 'ORG', email: string) => {
    const response = await axios.post(`${URI}/verify_email/`, { type, email });

    return response.data;
};

const sendPhoneOTP = async (phone_number: string) => {
    await axios.post(`${URI}/send_otp/`, { phone_number });
};

const verifyOTP = async (phone_number: string, otp: string) => {
    const response = await axios.post(`${URI}/verify_otp/`, { phone_number, otp });
    return response.data;
};

export { register, login, verifyJWT, sendVerificationEmail, sendPhoneOTP, verifyOTP };
