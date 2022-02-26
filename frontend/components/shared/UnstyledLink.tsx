import React from 'react';
import Link from 'next/link';

interface LinkProps {
	children: React.ReactNode;
}

const UnstyledLink = ({ children }: LinkProps): JSX.Element => {
	return (
		<Link href='/'>
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
