import Home from '@/components/home/Home';
import { screen, render } from '@testing-library/react';

jest.mock('@/components/home/Accolades', () => () => <div>Accolades</div>);
jest.mock('@/components/home/Hero', () => () => <div>Hero</div>);

describe('home/Home', () => {
    it('should render the Home component with the hero and accolades', () => {
        render(<Home />);
        expect(screen.getByText('Accolades')).toBeInTheDocument();
        expect(screen.getByText('Hero')).toBeInTheDocument();
    });
});
