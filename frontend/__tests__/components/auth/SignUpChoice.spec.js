import SignUpChoice from '@/components/auth/SignUpChoice';
import { screen, render } from '@testing-library/react';

describe('auth/SignUpChoice', () => {
    it('should show the sign up choices', () => {
        render(<SignUpChoice />);
        expect(screen.getByText('Register as Volunteer')).toBeInTheDocument();
        expect(screen.getByText('Register as Organization')).toBeInTheDocument();
    });
});
