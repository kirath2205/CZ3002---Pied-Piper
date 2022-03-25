//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Fade from 'react-reveal/Fade';
//mui
import { Button, TextField, Typography, Container, Stack } from '@mui/material';
//components
import SuccessAlert from '@/components/shared/SuccessAlert';
import ErrorAlert from '@/components/shared/ErrorAlert';
//types
import { OrganizationProfile } from '@/interfaces/Organization';

interface OrganizationProfileInfoProps {
    profile: OrganizationProfile;
}

/**
 * The yup validation for the sign up form for organizations
 */
const validationSchema = yup.object({
    email: yup.string().required('Email is required'),
    orgName: yup.string().required('Organization Name is required'),
    phone: yup.string().min(8, 'Enter an 8 digit phone number').max(8).required('Phone is required'),
    address: yup.string().min(10).required('Address is required'),
});

/**
 * Renders the Organization Profile Info
 *
 *
 * @returns {JSX.Element} - The Organization Profile Info
 */
const OrganizationProfileInfo = ({ profile }: OrganizationProfileInfoProps): JSX.Element => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: profile.email,
            orgName: profile.name,
            address: profile.address,
            phone: profile.phone_number,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                const apiRes = await axios.post(`/api/org_view/update_org_details/`, {
                    name: values.orgName,
                    address: values.address,
                });
                setSuccess(true);
            } catch (err: any) {
                setError(err.message);
            }
        },
        enableReinitialize: true,
    });

    return (
        <Fade duration={600}>
            <Container maxWidth='sm' sx={{ mt: 1 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography variant='h6' align='center'>
                        Organization Profile
                    </Typography>
                    {success && <SuccessAlert>Profile Updated successfully</SuccessAlert>}
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
                        disabled
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
                        disabled
                    />
                    <Stack>
                        <Button
                            sx={{ mt: 2, width: '40%', backgroundColor: '#12CDD4' }}
                            color='primary'
                            variant='contained'
                            fullWidth
                            type='submit'
                            aria-label='edit-profile'
                        >
                            Edit Profile
                        </Button>
                    </Stack>
                </form>
            </Container>
        </Fade>
    );
};

export default OrganizationProfileInfo;
