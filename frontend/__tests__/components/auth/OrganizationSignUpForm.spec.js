import OrganizationSignUpForm from '@/components/auth/OrganizationSignUpForm';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/app/slices/authSlice';

let mockStore;
describe('auth/SignInForm', () => {
    beforeEach(() => {
        mockStore = configureStore({
            reducer: {
                auth: authReducer,
            },
        });
    });
    it('should render the form title, fields, sign up button', () => {
        render(
            <Provider store={mockStore}>
                <OrganizationSignUpForm />
            </Provider>
        );
        //title
        expect(screen.getByText('Sign up')).toBeInTheDocument();
        //fields
        const fields = ['Organization Name', 'Password', 'Email', 'Address', 'Phone'];
        fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
        //sign in button
        expect(
            screen.getByRole('button', {
                name: /sign-up/i,
            })
        ).toBeInTheDocument();
    });

    it('should show the errors if fields not filled', async () => {
        render(
            <Provider store={mockStore}>
                <OrganizationSignUpForm />
            </Provider>
        );
        await waitFor(() => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: /sign-up/i,
                })
            );
        });
        const errorMessages = [
            'Organization Name is required',
            'Address is required',
            'Phone is required',
            'Email is required',
            'Address is required',
        ];
        errorMessages.forEach((message) => expect(screen.getByText(message)).toBeInTheDocument());
    });
});
