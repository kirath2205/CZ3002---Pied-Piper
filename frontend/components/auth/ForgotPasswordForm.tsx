//lib
import { useFormik } from 'formik';
import * as yup from 'yup';

//components
import ErrorAlert from '@/components/shared/ErrorAlert';

//mui
import { Button, TextField, Typography, Container, Stack } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

interface ForgotPasswordFormProps {
    sentOTP: () => void;
    sentEmail: (email: string) => void;
}
/**
 * The yup validation for the forgot password form
 */

const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
});

/**
 * Renders the forgot pass word form
 *
 *
 * @returns {JSX.Element} - The forgot password form
 */
const ForgotPasswordForm = ({ sentOTP, sentEmail }: ForgotPasswordFormProps): JSX.Element => {
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                const apiRes = await axios.post(`/api/auth/initiate_password_reset/`, { email: values.email });
                sentOTP();
                sentEmail(values.email);
                console.log('initiate password reset' + values.email);
                formik.resetForm();
            } catch (err: any) {
                setError(err.message);
            }
        },
    });
    return (
        <Container maxWidth='sm' sx={{ mt: 8 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Forgot Password
                </Typography>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='email'
                    name='email'
                    label='Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <Stack>
                    <Button
                        sx={{ mt: 1.4, width: '40%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='send-otp'
                    >
                        SEND OTP
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default ForgotPasswordForm;
