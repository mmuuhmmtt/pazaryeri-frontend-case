import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './button';

describe('Button Component', () => {
    it('renders button with text', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText('Click me');
        expect(button).toBeInTheDocument();
    });

    it('applies correct variant styles', () => {
        const { rerender } = render(<Button variant="primary">Primary</Button>);
        let button = screen.getByText('Primary');
        expect(button).toHaveClass('bg-primary-600');

        rerender(<Button variant="secondary">Secondary</Button>);
        button = screen.getByText('Secondary');
        expect(button).toHaveClass('bg-secondary-600');
    });

    it('applies correct size styles', () => {
        const { rerender } = render(<Button size="sm">Small</Button>);
        let button = screen.getByText('Small');
        expect(button).toHaveClass('h-9');

        rerender(<Button size="lg">Large</Button>);
        button = screen.getByText('Large');
        expect(button).toHaveClass('h-12');
    });

    it('shows loading state', () => {
        render(<Button isLoading>Loading</Button>);
        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    it('disables button when disabled prop is true', () => {
        render(<Button disabled>Disabled</Button>);
        const button = screen.getByText('Disabled');
        expect(button).toBeDisabled();
    });

    it('disables button when isLoading is true', () => {
        render(<Button isLoading>Loading</Button>);
        const button = screen.getByText('Loading...');
        expect(button).toBeDisabled();
    });

    it('renders with left icon', () => {
        const LeftIcon = () => <span data-testid="left-icon">L</span>;
        render(
            <Button leftIcon={<LeftIcon />}>
                With Left Icon
            </Button>
        );
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
        const RightIcon = () => <span data-testid="right-icon">R</span>;
        render(
            <Button rightIcon={<RightIcon />}>
                With Right Icon
            </Button>
        );
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
});
