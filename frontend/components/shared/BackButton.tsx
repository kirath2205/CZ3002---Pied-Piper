//mui
import { Box, Tooltip, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
//libs
import { useRouter } from 'next/router';

/**
 * Renders a back button to go the previous page
 *
 * @returns {JSX.Element} - The back button
 */
const BackButton = (): JSX.Element => {
    const router = useRouter();
    return (
        <Box>
            <Tooltip title='Back to previous page'>
                <IconButton onClick={() => router.back()}>
                    <ArrowBackRoundedIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default BackButton;
