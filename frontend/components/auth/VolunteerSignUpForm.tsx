//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
//mui
import {
    Button,
    TextField,
    Typography,
    Box,
    Container,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    FormGroup,
    Chip,
} from '@mui/material';
//redux
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { register, selectAuthState, clearError } from '@/app/slices/authSlice';
//types
import { Gender } from '@/interfaces/User';
import { UserWithPW } from '@/interfaces/User';
//components
import ErrorAlert from '@/components/shared/ErrorAlert';
import SuccessAlert from '@/components/shared/SuccessAlert';

/**
 * The yup validation for the sign up form for volunteers
 */
const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    gender: yup.mixed<Gender>().oneOf(['M', 'F', 'T']).required('Gender is required'),
    phone: yup.string().min(8, 'Enter an 8 digit phone number').max(8).required('Phone is required'),
    age: yup
        .number()
        .min(12, 'Age must be more than 12')
        .max(100, 'Age must be 100 or less')
        .required('Age is required'),
    address: yup.string().min(10).required('Address is required'),
    skills: yup.array().min(1, 'At least one skill is required'),
});

/**
 * Renders the sign up form for volunteers
 *
 *
 * @returns {JSX.Element} - The sign up form for volunteers
 */
const VolunteerSignUpForm = (): JSX.Element => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuthState);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            skills: [],
            age: 0,
            phone: '',
            gender: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { firstName, lastName, phone, age } = values;
            const user = {
                ...values,
                first_name: firstName,
                last_name: lastName,
                phone_number: phone,
                type: 'USER',
            };
            dispatch(clearError());
            await dispatch(register(user as UserWithPW));
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Sign up
                </Typography>
                <SuccessAlert>{authState.message}</SuccessAlert>
                <ErrorAlert>{authState.error}</ErrorAlert>
                <FormGroup row sx={{ mt: 2, gap: 2, flexWrap: 'nowrap' }}>
                    <TextField
                        sx={{ width: '50%' }}
                        id='firstName'
                        name='firstName'
                        label='First Name'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        sx={{ width: '50%' }}
                        id='lastName'
                        name='lastName'
                        label='Last Name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </FormGroup>
                <FormGroup row sx={{ mt: 2, gap: 2, flexWrap: 'nowrap' }}>
                    <FormControl error={formik.touched.gender && Boolean(formik.errors.gender)} sx={{ width: '50%' }}>
                        <InputLabel id='gender'>Gender</InputLabel>
                        <Select
                            labelId='gender'
                            id='gender'
                            name='gender'
                            value={formik.values.gender}
                            label='Gender'
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={'M'}>Male</MenuItem>
                            <MenuItem value={'F'}>Female</MenuItem>
                            <MenuItem value={'T'}>Others</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                    </FormControl>
                    <TextField
                        sx={{ width: '50%' }}
                        type='number'
                        id='age'
                        name='age'
                        label='Age'
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && formik.errors.age}
                        onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                    />
                </FormGroup>
                <TextField
                    inputProps={{ maxLength: 8 }}
                    sx={{ mt: 2 }}
                    fullWidth
                    id='phone'
                    name='phone'
                    label='Phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    type='number'
                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                    helperText={formik.touched.phone && formik.errors.phone}
                    onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                />
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
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
                <FormControl sx={{ mt: 2 }} error={formik.touched.skills && Boolean(formik.errors.skills)} fullWidth>
                    <InputLabel id='skills'>Skills</InputLabel>
                    <Select
                        labelId='skills'
                        id='skills'
                        name='skills'
                        value={formik.values.skills}
                        label='Gender'
                        onChange={formik.handleChange}
                        multiple
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                            </Box>
                        )}
                    >
                            <MenuItem value={'Arts & Music'}>Arts & Music</MenuItem>
                            <MenuItem value={'Medical & Health'}>Medical & Health</MenuItem>
                            <MenuItem value={'Coaching & Training'}>Coaching & Training</MenuItem>
                            <MenuItem value={'Counselling & Mentoring'}>Counselling & Mentoring</MenuItem>
                            <MenuItem value={'IT'}>IT</MenuItem>
                            <MenuItem value={'Volunteer Management'}>Volunteer Management</MenuItem>
                            <MenuItem value={'Others'}>Others</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.skills && formik.errors.skills}</FormHelperText>
                </FormControl>
                <Stack>
                    <Box sx={{ mt: 0.8 }}>
                        Already have an account?
                        <Button
                            size='small'
                            variant='text'
                            onClick={() => {
                                dispatch(clearError());
                                router.push('/auth/signin');
                            }}
                        >
                            Sign In
                        </Button>
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

export default VolunteerSignUpForm;
