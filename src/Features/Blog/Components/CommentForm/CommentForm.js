import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CommentForm from './CommentForm';

// Mocking the useAxios and useAuth hooks
jest.mock('../../../../Hooks/useAxios', () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock('../../../../Hooks/useAuth', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('CommentForm', () => {
    // Mock data for testing
    const mockRefetch = jest.fn();

    beforeEach(() => {
        // Reset mock functions before each test
        jest.clearAllMocks();
    });

    test('renders CommentForm component', () => {
        render(<CommentForm id="1" refetch={mockRefetch} />);

        // Ensure the key elements are present
        expect(screen.getByText('Share your thoughts')).toBeInTheDocument();
        expect(screen.getByText('Your Name*')).toBeInTheDocument();
        expect(screen.getByText('Rating*')).toBeInTheDocument();
        expect(screen.getByText('Your Comment*')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Submit Comment' })).toBeInTheDocument();
    });

    test('displays error message on unsuccessful form submission', async () => {
        render(<CommentForm id="1" refetch={mockRefetch} />);

        // Mock unsuccessful form submission
        jest.spyOn(window, 'fetch').mockResolvedValueOnce({
            json: async () => ({ status: 'error' }),
        });

        // Submit the form without filling required fields
        fireEvent.click(screen.getByRole('button', { name: 'Submit Comment' }));

        // Ensure error message is displayed
        const errorMessage = await screen.findByText('This field is required');
        expect(errorMessage).toBeInTheDocument();

        // Ensure refetch is not called after unsuccessful submission
        expect(mockRefetch).not.toHaveBeenCalled();
    });
});
