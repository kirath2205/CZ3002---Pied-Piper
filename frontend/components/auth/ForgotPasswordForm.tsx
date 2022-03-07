//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
//mui
import { Button, TextField, Typography, Box, Container, Stack, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormGroup } from '@mui/material';

/**
 * The yup validation for the sign up form for volunteers
 */
const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    phone: yup.string().required('Phone is required'),
});

/**
 * Renders the sign up form for volunteers
 *
 *
 * @returns {JSX.Element} - The sign up form for volunteers
 */
const VolunteerSignUpForm = (): JSX.Element => {
    const formik = useFormik({
        initialValues: {
            email: '',
            phone: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            formik.resetForm();
            console.dir(values);
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 8 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Reset Password
                </Typography>

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
                <Stack>
                    <Button
                        sx={{ mt: 1.4, width: '40%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='reset-password'
                    >
                        Reset password
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default VolunteerSignUpForm;
