import React, { useState } from 'react';
//components
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import OTPForm from '@/components/auth/OTPForm';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

//mui
import {Container} from '@mui/material';

const ForgotPasswordChoice = (): JSX.Element => {

    const [formData, setEmail] = useState({
        email: '',
    });
    const [otpSent, setOtpSent] = useState(false);
    const [otpConfirmed, setOTPConfirmed] = useState(false);

    const sentEmail = (email: string) =>{
        setEmail({email:email});
    };

    const sentOTP = () => {
        setOtpSent(true);
    };
    
    const confirmedOTP = () => {
        setOTPConfirmed(true);
    }

    return <Container>
        {!otpSent && <ForgotPasswordForm sentOTP={sentOTP} sentEmail={sentEmail}/>}
        {(otpSent && !otpConfirmed)  && <OTPForm email={formData.email} confirmedOTP={confirmedOTP}/>}
        {(otpSent && otpConfirmed) && <ResetPasswordForm email={formData.email}/>}
        </Container>;
};

export default ForgotPasswordChoice;