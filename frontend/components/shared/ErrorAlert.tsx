import React, { useState, useEffect } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorAlertProps {
    children: React.ReactNode;
}

const ErrorAlert = ({ children }: ErrorAlertProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(Boolean(children));
    useEffect(() => {
        setOpen(Boolean(children));
    }, [children]);
    return (
        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label='close'
                        color='inherit'
                        size='small'
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize='inherit' />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity='error'
            >
                {children}
            </Alert>
        </Collapse>
    );
};

export default ErrorAlert;
