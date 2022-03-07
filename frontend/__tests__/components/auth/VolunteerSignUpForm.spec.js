import VolunteerSignUpForm from '@/components/auth/VolunteerSignUpForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

describe('auth/SignInForm', () => {
    it('should render the form title, fields, sign up button', () => {
        render(<VolunteerSignUpForm />);
        //title
        expect(screen.getByText('Volunteer Sign up')).toBeInTheDocument();
        //fields
        const fields = ['Email', 'Password', 'Last Name', 'Age', 'Gender', 'Skills', 'Address'];
        fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
        //sign in button
        expect(
            screen.getByRole('button', {
                name: /sign-up/i,
            })
        ).toBeInTheDocument();
    });

    it('should show the errors if fields not filled', async () => {
        render(<VolunteerSignUpForm />);
        await waitFor(() => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: /sign-up/i,
                })
            );
        });
        const errorMessages = [
            'Email is required',
            'Password is required',
            'First Name is required',
            'Last Name is required',
            'Gender is required',
            'Age is required',
            'Phone is required',
            'At least one skill is required',
            'Address is required',
        ];
        errorMessages.forEach((message) => expect(screen.getByText(message)).toBeInTheDocument());
    });
});
