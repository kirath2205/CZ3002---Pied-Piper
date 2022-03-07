import SignUpChoice from '@/components/auth/SignUpChoice';
import { screen, render, fireEvent } from '@testing-library/react';

jest.mock('@/components/auth/VolunteerSignUpForm', () => () => <div>VolunteerSignUpForm</div>);
jest.mock('@/components/auth/OrganizationSignUpForm', () => () => <div>OrganizationSignUpForm</div>);

describe('auth/SignUpChoice', () => {
    it('should show the sign up choices', () => {
        render(<SignUpChoice />);
        expect(screen.getByText('Volunteer')).toBeInTheDocument();
        expect(screen.getByText('Organization')).toBeInTheDocument();
    });

    it('should default to volunteer sign up form', () => {
        render(<SignUpChoice />);
        expect(
            screen.getByRole('tab', {
                name: /volunteer/i,
            })
        ).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByText('VolunteerSignUpForm')).toBeInTheDocument();
    });

    it('should switch tabs when clicked', () => {
        render(<SignUpChoice />);
        fireEvent.click(screen.getByRole('tab', { name: /organization/i }));
        expect(screen.getByRole('tab', { name: /organization/i })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByText('OrganizationSignUpForm')).toBeInTheDocument();
    });
});
