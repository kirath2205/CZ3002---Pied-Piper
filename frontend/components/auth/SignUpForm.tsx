//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import Link from 'next/link';
//mui
import { Button, TextField, Typography, Box, Container, Stack, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

/**
 * The yup validation for the sign up form
 */
const validationSchema = yup.object({
	email: yup.string().required('Email is required'),
	password: yup.string().required('Password is required'),
	accountType: yup.string().oneOf(['volunteer', 'organization']).required('Account Type is required'),
});

/**
 * Renders the sign up form
 *
 *
 * @returns {JSX.Element} - The sign up form
 */
const SignUpForm = (): JSX.Element => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			accountType: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			formik.resetForm();
			console.dir(values);
		},
	});

	return (
		<Container maxWidth='sm' sx={{ mt: 10 }}>
			<form onSubmit={formik.handleSubmit}>
				<Typography variant='h6' align='center'>
					Sign up for VolunteerGoWhere
				</Typography>
				<TextField
					sx={{ marginY: '0.3rem', mt: 2 }}
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
				<FormControl fullWidth sx={{ marginY: '0.3rem', mt: 1 }} error={formik.touched.accountType && Boolean(formik.errors.accountType)}>
					<InputLabel id='account-type'>Account Type</InputLabel>
					<Select
						labelId='account-type'
						id='accountType'
						name='accountType'
						value={formik.values.accountType}
						label='Account Type'
						onChange={formik.handleChange}
					>
						<MenuItem value={'volunteer'}>Volunteer</MenuItem>
						<MenuItem value={'organization'}>Organization</MenuItem>
					</Select>
					<FormHelperText>{formik.errors.accountType}</FormHelperText>
				</FormControl>
				<Stack>
					<Box sx={{ marginTop: 2 }}>
						Already have an account? <Link href='/auth/signin'>Sign In</Link>
					</Box>
					<Button
						sx={{ marginTop: 2, width: '40%', backgroundColor: '#03c2fc' }}
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

export default SignUpForm;
