import React from 'react';
import Link from 'next/link';

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
const UnstyledLink = ({ children, href }: UnstyledLinkProps): JSX.Element => {
	return (
		<Link href={href || '/'}>
			<a
				style={{
					textDecoration: 'none',
					color: 'inherit',
				}}
			>
				{children}
			</a>
		</Link>
	);
};

export default UnstyledLink;
