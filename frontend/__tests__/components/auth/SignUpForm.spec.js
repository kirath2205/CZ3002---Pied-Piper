import SignInForm from '@/components/auth/SignUpForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('auth/SignInForm', () => {
	it('should render the form title, fields, sign in button', () => {
		render(<SignInForm />);
		//title
		expect(screen.getByText('Sign up for VolunteerGoWhere')).toBeInTheDocument();
		//fields
		expect(screen.getByLabelText('Email')).toBeInTheDocument();
		expect(screen.getByLabelText('Password')).toBeInTheDocument();
		expect(screen.getByLabelText('Account Type')).toBeInTheDocument();
		//sign in button
		expect(
			screen.getByRole('button', {
				name: /sign-up/i,
			})
		).toBeInTheDocument();
	});

	it('should show the errors if fields not filled', async () => {
		render(<SignInForm />);
		await waitFor(() => {
			fireEvent.click(
				screen.getByRole('button', {
					name: /sign-up/i,
				})
			);
		});

		expect(screen.getByText('Email is required')).toBeInTheDocument();
		expect(screen.getByText('Password is required')).toBeInTheDocument();
		expect(screen.getByText('Account Type is required')).toBeInTheDocument();
	});
});
