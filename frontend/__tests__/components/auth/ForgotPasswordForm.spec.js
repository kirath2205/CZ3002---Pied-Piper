import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { screen, render } from '@testing-library/react';

describe('auth/ForgotPasswordForm', () => {
    it('should render the fields and the button', () => {
        render(<ForgotPasswordForm />);
        const fields = ['Email'];
        fields.forEach((field) => expect(screen.getByLabelText(field)).toBeInTheDocument());
        expect(screen.getByRole('button', { text: /SEND OTP/i })).toBeInTheDocument();
    });
});
