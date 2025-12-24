import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant classes correctly', () => {
        const { container } = render(<Button variant="outline">Test</Button>);
        expect(container.firstChild).toHaveClass('border-secondary-300');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click</Button>);
        screen.getByRole('button').click();
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
