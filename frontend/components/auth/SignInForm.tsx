//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
//mui
import { Button, TextField, Typography, Box, Container, Stack } from '@mui/material';
//components
import ErrorAlert from '@/components/shared/ErrorAlert';
//redux
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { login, selectAuthState, clearError } from '@/app/slices/authSlice';

/**
 * The yup validation for the store
 */
const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
});

/**
 * Renders the sign in form
 *
 *
 * @returns {JSX.Element} - The sign in form
 */
const SignInForm = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuthState);
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            dispatch(clearError());
            const { email, password } = values;
            dispatch(login(values));
        },
    });

    if (typeof window !== undefined && authState.loggedIn) {
        router.push('/');
    }

    return (
        <Container maxWidth='sm' sx={{ mt: 10 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Sign in to VolunteerGoWhere
                </Typography>
                {<ErrorAlert>{authState.error}</ErrorAlert>}
                <TextField
                    sx={{ marginY: '0.3rem' }}
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
                    sx={{ marginY: '0.3rem' }}
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
                    <Box mt={1}>
                        Don&apos;t have an account yet?
                        <Button
                            size='small'
                            variant='text'
                            onClick={() => {
                                dispatch(clearError());
                                router.push('/auth/signup');
                            }}
                        >
                            Sign up here
                        </Button>
                    </Box>
                    <Box>
                        Forgot your password?
                        <Button
                            size='small'
                            variant='text'
                            onClick={() => {
                                dispatch(clearError());
                                router.push('/auth/forgot-password');
                            }}
                        >
                            Reset here
                        </Button>
                    </Box>
                    <Button
                        sx={{ marginTop: 2, width: '40%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='sign-in'
                    >
                        Sign In
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default SignInForm;
