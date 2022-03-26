import { Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

interface SuccessToastProps {
    initialize: boolean;
    message: string;
    severity: 'success' | 'error';
}

const Toast = ({ initialize, message, severity }: SuccessToastProps) => {
    const [open, setOpen] = useState(initialize);
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={severity} sx={{ width: '100%' }} onClose={handleClose}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
