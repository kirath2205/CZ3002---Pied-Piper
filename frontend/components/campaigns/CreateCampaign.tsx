//TODO Time format 12:00 and Date format 2022-12-31 YYYY-MM-DD

//lib
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
//mui
import { useState } from 'react';
import axios from 'axios';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import DateAdapter from '@mui/lab/AdapterDateFns';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, TextField, Typography, Box, Container, Stack, Select, MenuItem, FormControl, InputLabel, FormHelperText, FormGroup } from '@mui/material';
//services
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { register, selectAuthState, clearError } from '@/app/slices/authSlice';
//types
import React from 'react';
//components
import SuccessAlert from '@/components/shared/SuccessAlert';
import ErrorAlert from '@/components/shared/ErrorAlert';
/**
 * The yup validation for the sign up form for volunteers
 */
const validationSchema = yup.object({
    location: yup.string().required('Location is required'),
    skills: yup.array().min(1, 'At least one skill is required'),
    date: yup.string().required('Date is required'),
    time: yup.string().required('Time is required'),
    description: yup.string().required('Description is required'),
    title: yup.string().required('Title is required'),
    duration: yup.string().required('Duration is required'),
    volunteer_count: yup.string().min(1, 'Enter a valid number').required('Volunteer Count is required'),
    minimum_age: yup.number().min(12, 'Age must be more than 12').max(100, 'Age must be 100 or less').required('Age is required'),
});

/**
 * Renders the create campaign page for organisation
 *
 *
 * @returns {JSX.Element} - The create campaign page for organisation
 */
const CreateCampaign = (): JSX.Element => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const router = useRouter();
    const dispatch = useAppDispatch();
    const authState = useAppSelector(selectAuthState);

      const [value, setValue] = React.useState<Date | null>(
      );
    
      const handleChange = (newValue: Date | null) => {
        setValue(newValue);
      };

    const formik = useFormik({
        initialValues: {
            location: '',
            skills: [],
            date: '',
            time: '',
            description: '',
            title: '',
            duration: '',
            volunteer_count: '',
            minimum_age: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                const apiRes = await axios.post(`/api/auth/create_campaign/`, 
            { location:values.location,skills:values.skills,date:values.date,time:values.time,
                description:values.description,title:values.title,duration:values.duration,volunteer_count:values.volunteer_count,
                minimum_age:values.minimum_age
            });
                setSuccess(true);
                formik.resetForm();
            } catch (err: any) {
                console.log('err')
                setSuccess(false);
                setError('Failed to Create Campaign. Please try again!')
            }
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 1 }}>
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Create Campaign
                </Typography>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                {success && <SuccessAlert>Campaign created Successfully</SuccessAlert>}
                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='location'
                    name='location'
                    label='Location'
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                />
                <FormControl sx={{ mt: 2 }} error={formik.touched.skills && Boolean(formik.errors.skills)} fullWidth>
                    <InputLabel id='skills'>Skills</InputLabel>
                    <Select labelId='skills' id='skills' name='skills' value={formik.values.skills} label='Gender' onChange={formik.handleChange} multiple>
                        <MenuItem value={'IT'}>IT</MenuItem>
                        <MenuItem value={'Elderly'}>Elderly</MenuItem>
                        <MenuItem value={'Environment'}>Environment</MenuItem>
                        <MenuItem value={'NIL'}>NIL</MenuItem>
                    </Select>
                    <FormHelperText>{formik.touched.skills && formik.errors.skills}</FormHelperText>
                </FormControl>

                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack sx={{ mt: 2 }}>
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/dd/yyyy"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    renderInput={(params) => <TextField {...params} />}
                    
                />
                    </Stack>
                </LocalizationProvider>   */}

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='date'
                    name='date'
                    label='Date'
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.touched.date && Boolean(formik.errors.date)}
                    helperText={formik.touched.date && formik.errors.date}
                />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='time'
                    name='time'
                    label='Time'
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    error={formik.touched.time && Boolean(formik.errors.time)}
                    helperText={formik.touched.time && formik.errors.time}
                />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='title'
                    name='title'
                    label='Title'
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='description'
                    name='description'
                    label='Description'
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />


                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='duration'
                    name='duration'
                    label='Duration'
                    value={formik.values.duration}
                    onChange={formik.handleChange}
                    error={formik.touched.duration && Boolean(formik.errors.duration)}
                    helperText={formik.touched.duration && formik.errors.duration}
                />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='volunteer_count'
                    name='volunteer_count'
                    label='Volunteer Vacancies'
                    value={formik.values.volunteer_count}
                    onChange={formik.handleChange}
                    error={formik.touched.volunteer_count && Boolean(formik.errors.volunteer_count)}
                    helperText={formik.touched.volunteer_count && formik.errors.volunteer_count}
                />

                <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    id='minimum_age'
                    name='minimum_age'
                    label='Minimum age'
                    value={formik.values.minimum_age}
                    onChange={formik.handleChange}
                    error={formik.touched.minimum_age && Boolean(formik.errors.minimum_age)}
                    helperText={formik.touched.minimum_age && formik.errors.minimum_age}
                />

                <Stack>
                    <Button
                        sx={{ mt: 0.8, width: '100%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='create-campaign'
                    >
                        Create Campaign
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default CreateCampaign;