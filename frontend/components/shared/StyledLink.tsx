import React from 'react';
import Link from 'next/link';
import { blue } from '@mui/material/colors';

interface UnstyledLinkProps {
    children: React.ReactNode;
    href?: string;
}

/**
 * Renders a Next.js link component without the default styling
 *
 * @param {UnstyledLinkProps} props - The children and href
 * @returns {JSX.Element} - The UnstyledLink component
 */
const StyleLink = ({ children, href }: UnstyledLinkProps): JSX.Element => {
    return (
        <Link href={href || '/'}>
            <a
                style={{
                    textDecoration: 'underline',
                    color: blue[500],
                
                }}
            >
                {children}
            </a>
        </Link>
        
    );
};

export default StyleLink;