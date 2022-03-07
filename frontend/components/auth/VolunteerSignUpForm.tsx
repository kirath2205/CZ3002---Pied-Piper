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
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    gender: yup.string().oneOf(['M', 'F', 'O']).required('Gender is required'),
    phone: yup.string().required('Phone is required'),
    age: yup.number().min(12, 'Age must be more than 12').max(100, 'Age must be 100 or less').required('Age is required'),
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
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            skills: [],
            age: '',
            gender: '',
            phone: '',
            address: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            formik.resetForm();
            console.dir(values);
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 4 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Volunteer Sign up
                </Typography>
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
                        <Select labelId='gender' id='gender' name='gender' value={formik.values.gender} label='Gender' onChange={formik.handleChange}>
                            <MenuItem value={'M'}>Male</MenuItem>
                            <MenuItem value={'F'}>Female</MenuItem>
                            <MenuItem value={'O'}>Others</MenuItem>
                        </Select>
                        <FormHelperText>{formik.errors.gender}</FormHelperText>
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
                    />
                </FormGroup>
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
                    <Select labelId='skills' id='skills' name='skills' value={formik.values.skills} label='Gender' onChange={formik.handleChange} multiple>
                        <MenuItem value={'IT'}>IT</MenuItem>
                        <MenuItem value={'Elderly'}>Elderly</MenuItem>
                        <MenuItem value={'Environment'}>Environment</MenuItem>
                    </Select>
                    <FormHelperText>{formik.errors.skills}</FormHelperText>
                </FormControl>
                <Stack>
                    <Box sx={{ mt: 2 }}>
                        Already have an account? <Link href='/auth/signin'>Sign In</Link>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Link href='/auth/signup/organization'>Sign up as organization instead</Link>
                    </Box>
                    <Button
                        sx={{ mt: 2, width: '40%', backgroundColor: '#12CDD4' }}
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
