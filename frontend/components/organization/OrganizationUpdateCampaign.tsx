//lib
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

//mui
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
    Button,
    TextField,
    Typography,
    Container,
    Stack,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Box,
    Chip,
} from '@mui/material';
//components
import SuccessAlert from '@/components/shared/SuccessAlert';
import ErrorAlert from '@/components/shared/ErrorAlert';
import BackButton from '@/components/shared/BackButton';
//types
import { Campaign } from '@/interfaces/Campaign';

interface OrganizationUpdateCampaignProps {
    campaign: Campaign;
}

/**
 * The yup validation for the create campaign form
 */
const validationSchema = yup.object({
    location: yup.string().required('Location is required'),
    skills: yup.array().min(1, 'At least one skill is required'),
    date_time: yup
        .date()
        .min(new Date(), 'Start datetime cannot be in the past')
        .required('Start datetime is required'),
    end_time: yup
        .date()
        .min(yup.ref('date_time'), 'End datetime must be after start datetime')
        .required('End datetime is required'),
    description: yup.string().required('Description is required'),
    title: yup.string().required('Title is required'),
    volunteer_count: yup.string().min(1, 'Enter a valid number').required('Volunteer Count is required'),
    minimum_age: yup
        .number()
        .min(12, 'Age must be more than 12')
        .max(100, 'Age must be 100 or less')
        .required('Age is required'),
});

/**
 * Renders the update campaign page for organisation
 *
 *
 * @returns {JSX.Element} - The update campaign page for organisation
 */
const OrganizationUpdateCampaign = ({ campaign }: OrganizationUpdateCampaignProps): JSX.Element => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const formik = useFormik({
        initialValues: {
            location: campaign.location,
            skills: campaign.skills,
            date_time: campaign.date_time,
            end_time: campaign.end_time,
            description: campaign.description,
            title: campaign.title,
            volunteer_count: campaign.volunteer_count,
            minimum_age: campaign.minimum_age,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                setError('');
                const apiRes = await axios.post(`/api/org_view/update_campaign_details/`, {
                    location: values.location,
                    skills: values.skills,
                    date_time: values.date_time,
                    end_time: values.end_time,
                    description: values.description,
                    title: values.title,
                    volunteer_count: values.volunteer_count,
                    minimum_age: values.minimum_age,
                    campaign_id: campaign.pk as number,
                });
                setSuccess(true);
                formik.resetForm();
            } catch (err: any) {
                setSuccess(false);
                setError('Failed to Update Campaign. Please try again!');
            }
        },
    });

    return (
        <Container maxWidth='sm' sx={{ mt: 1 }}>
            <BackButton />
            <form onSubmit={formik.handleSubmit}>
                <Typography variant='h6' align='center'>
                    Update Campaign (Campaign Name)
                </Typography>
                {error && <ErrorAlert>{error}</ErrorAlert>}
                {success && <SuccessAlert>Campaign updated Successfully</SuccessAlert>}
                <Stack gap={0.5}>
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
                    <FormControl
                        sx={{ mt: 2 }}
                        error={formik.touched.skills && Boolean(formik.errors.skills)}
                        fullWidth
                    >
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
                            <MenuItem value={'IT'}>IT</MenuItem>
                            <MenuItem value={'Elderly'}>Elderly</MenuItem>
                            <MenuItem value={'Environment'}>Environment</MenuItem>
                            <MenuItem value={'NIL'}>NIL</MenuItem>
                        </Select>
                        <FormHelperText>{formik.touched.skills && formik.errors.skills}</FormHelperText>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            minDate={new Date()}
                            value={formik.values.date_time}
                            onChange={(value) => {
                                formik.setFieldValue('date_time', value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Event Datetime (Start)'
                                    id='date_time'
                                    name='date_time'
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    error={formik.touched.date_time && Boolean(formik.errors.date_time)}
                                    helperText={formik.touched.date_time && formik.errors.date_time}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker
                            minDate={new Date()}
                            value={formik.values.end_time}
                            onChange={(value) => {
                                formik.setFieldValue('end_time', value);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Event Datetime (End)'
                                    id='end_time'
                                    name='end_time'
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    error={formik.touched.end_time && Boolean(formik.errors.end_time)}
                                    helperText={formik.touched.end_time && formik.errors.end_time}
                                />
                            )}
                        />
                    </LocalizationProvider>

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
                        id='volunteer_count'
                        name='volunteer_count'
                        label='Volunteer vacancies'
                        type='number'
                        value={formik.values.volunteer_count}
                        onChange={formik.handleChange}
                        error={formik.touched.volunteer_count && Boolean(formik.errors.volunteer_count)}
                        helperText={formik.touched.volunteer_count && formik.errors.volunteer_count}
                        onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                    />

                    <TextField
                        sx={{ mt: 2 }}
                        fullWidth
                        id='minimum_age'
                        name='minimum_age'
                        label='Minimum age'
                        type='number'
                        value={formik.values.minimum_age}
                        onChange={formik.handleChange}
                        error={formik.touched.minimum_age && Boolean(formik.errors.minimum_age)}
                        helperText={formik.touched.minimum_age && formik.errors.minimum_age}
                        onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                    />
                </Stack>

                <Stack>
                    <Button
                        sx={{ mt: 2, width: '100%', backgroundColor: '#12CDD4' }}
                        color='primary'
                        variant='contained'
                        fullWidth
                        type='submit'
                        aria-label='update-campaign'
                    >
                        Update Campaign
                    </Button>
                </Stack>
            </form>
        </Container>
    );
};

export default OrganizationUpdateCampaign;
