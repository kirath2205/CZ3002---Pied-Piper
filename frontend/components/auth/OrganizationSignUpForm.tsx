//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
//mui
import { Button, TextField, Typography, Box, Container, Stack } from '@mui/material';
//services
import { register, sendPhoneOTP, sendVerificationEmail } from '@/services/authService';
//components
import ErrorAlert from '@/components/shared/ErrorAlert';

/**
 * The yup validation for the sign up form for organizations
 */
const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    orgName: yup.string().required('Organization Name is required'),
    phone: yup.string().min(8, 'Enter an 8 digit phone number').max(8).required('Phone is required'),
    address: yup.string().min(10).required('Address is required'),
});

/**
 * Renders the sign up form for organizations
 *
 *
 * @returns {JSX.Element} - The sign up form for organizations
 */
const OrganizationSignUpForm = (): JSX.Element => {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            orgName: '',
            address: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { orgName, email, password, address, phone } = values;
            try {
                const response = await register({
                    name: orgName,
                    email,
                    address,
                    phone_number: phone,
                    password,
                    type: 'ORG',
                });
                formik.resetForm();
            } catch (err: any) {
                setError(err.response.data);
                return;
            }

            await sendVerificationEmail('ORG', email);
            await sendPhoneOTP(phone);
            router.push('/');
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Sign up
                </Typography>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                <TextField
                    fullWidth
                    sx={{ mt: 2 }}
                    id='orgName'
                    name='orgName'
                    label='Organization Name'
                    value={formik.values.orgName}
                    onChange={formik.handleChange}
                    error={formik.touched.orgName && Boolean(formik.errors.orgName)}
                    helperText={formik.touched.orgName && formik.errors.orgName}
                />
                <TextField
                    fullWidth
                    sx={{ mt: 2 }}
                    id='address'
                    name='address'
                    label='Address'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                />
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='phone'
                    name='phone'
                    label='Phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type='phone'
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                />
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
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='password'
                    name='password'
                    label='Password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    type='password'
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Stack>
                    <Box sx={{ mt: 0.8 }}>
                        Already have an account? <Link href='/auth/signin'>Sign In</Link>
                    </Box>
                    <Button
                        sx={{ mt: 0.8, width: '40%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='sign-up'
                    >
                        Sign Up
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default OrganizationSignUpForm;
