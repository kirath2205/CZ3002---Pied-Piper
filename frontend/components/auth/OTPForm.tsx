//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
//mui
import { Button, TextField, Typography, Container, Stack } from '@mui/material';

/**
 * The yup validation for the otp form
 */
const validationSchema = yup.object({
    otp: yup.string().required('OTP is required'),
});

interface OTPFormProps {
    email: string;
    confirmedOTP: () => void;
}

/**
 * Renders the OTP Form
 *
 *
 * @returns {JSX.Element} - The otp form
 */
const OTPForm = ({ email, confirmedOTP }: OTPFormProps) => {
    const formik = useFormik({
        initialValues: {
            otp: '',
            email,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const apiRes = await axios.post(`/api/auth/password_reset_OTP_verification/`, { otp: values.otp, email });
            confirmedOTP();
            formik.resetForm();
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 8 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    OTP
                </Typography>

                <TextField sx={{ mt: 2 }} fullWidth id='email' name='email' label='Email' value={email} disabled />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='otp'
                    name='otp'
                    label='Enter OTP'
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    error={formik.touched.otp && Boolean(formik.errors.otp)}
                    helperText={formik.touched.otp && formik.errors.otp}
                />
                <Stack>
                    <Button
                        sx={{ mt: 1.4, width: '40%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='reset-password'
                    >
                        CONFIRM OTP
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default OTPForm;
