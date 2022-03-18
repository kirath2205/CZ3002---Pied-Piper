//lib
import React, { useState, useEffect } from 'react';
//mui
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface SuccessAlertProps {
    children: React.ReactNode;
}

/**
 * Renders an success alert
 *
 * @param {SuccessAlertProps} - The content to be rendered in the alert
 * @returns {JSX.Element} - The success alert
 */
const SuccessAlert = ({ children }: SuccessAlertProps): JSX.Element => {
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
                severity='success'
            >
                {children}
            </Alert>
        </Collapse>
    );
};

export default SuccessAlert;
