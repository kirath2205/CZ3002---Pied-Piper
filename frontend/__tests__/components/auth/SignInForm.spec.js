import SignInForm from '@/components/auth/SignInForm';
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
    it('should render the form title,  fields, sign in button', () => {
        render(
            <Provider store={mockStore}>
                <SignInForm />
            </Provider>
        );
        //title
        expect(screen.getByText('Sign in to VolunteerGoWhere')).toBeInTheDocument();
        //fields
        const fields = ['Email', 'Password'];
        fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
        //sign in button
        expect(
            screen.getByRole('button', {
                name: /sign-in/i,
            })
        ).toBeInTheDocument();
    });

    it('should show the errors if fields not filled', async () => {
        render(
            <Provider store={mockStore}>
                <SignInForm />
            </Provider>
        );
        await waitFor(() => {
            fireEvent.click(
                screen.getByRole('button', {
                    name: /sign-in/i,
                })
            );
        });
        const errorMessages = ['Email is required', 'Password is required'];
        errorMessages.forEach((message) => expect(screen.getByText(message)).toBeInTheDocument());
    });
});
