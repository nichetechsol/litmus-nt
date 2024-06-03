import { render, screen } from '@testing-library/react'; // Import act from @testing-library/react
import { useRouter } from 'next/navigation'; // Assuming you're using useRouter from next/router
import { act } from 'react';

import HomePage from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Homepage', () => {
  it('renders the Components', async () => {
    // Make the test function async
    (useRouter as jest.Mock).mockReturnValue({
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
    });

    await act(async () => {
      // Use act to wrap the rendering and interaction with the component
      render(<HomePage />);
    });

    const heading = screen.getByText(/Remember password ?/i);
    expect(heading).toBeInTheDocument();
  });
});
