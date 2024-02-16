import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LatestBlog from './LatestBlog';

const mockBlog = {
  _id: '123',
  heading: 'Sample Blog',
  images: ['sample-image-url.jpg'],
};

test('renders App component with blog data', () => {
  render(
    <Router>
      <LatestBlog blog={mockBlog} />
    </Router>
  );

  // Check if heading and image are rendered
  const headingElement = screen.getByText(mockBlog.heading);
  const imageElement = screen.getByAltText('');
  expect(headingElement).toBeInTheDocument();
  expect(imageElement).toBeInTheDocument();

  // Additional assertions based on your styling and structure
  // For example, you might want to check the presence of specific CSS classes.
});

test('links to the correct blog URL', () => {
  render(
    <Router>
      <LatestBlog blog={mockBlog} />
    </Router>
  );

  // Check if the Link component has the correct URL
  const linkElement = screen.getByRole('link', { name: mockBlog.heading });
  expect(linkElement).toHaveAttribute('href', `/blogs/${mockBlog._id}`);
});

test('renders the correct image', () => {
  render(
    <Router>
      <LatestBlog blog={mockBlog} />
    </Router>
  );

  const imageElement = screen.getByAltText('');
  expect(imageElement).toHaveAttribute('src', mockBlog.images[0]);
});

test('applies the correct styles to the Link component', () => {
  render(
    <Router>
      <LatestBlog blog={mockBlog} />
    </Router>
  );

  const linkElement = screen.getByRole('link', { name: mockBlog.heading });
  expect(linkElement).toHaveClass('cursor-pointer');
  expect(linkElement).toHaveClass('hover:text-[#EB6753]');
  expect(linkElement).toHaveClass('duration-200');
  expect(linkElement).toHaveClass('font-bold');
  expect(linkElement).toHaveClass('leading-6');
});

test('renders Link component with correct content', () => {
  render(
    <Router>
      <LatestBlog blog={mockBlog} />
    </Router>
  );

  const linkElement = screen.getByRole('link', { name: mockBlog.heading });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveTextContent(mockBlog.heading);
});

test('renders Link component with no data', () => {
  render(
    <Router>
      <LatestBlog blog={{}} />
    </Router>
  );

  const linkElement = screen.queryByRole('link');
  expect(linkElement).toBeNull();
});

test('does not render image with no data', () => {
  render(
    <Router>
      <LatestBlog blog={{}} />
    </Router>
  );

  const imageElement = screen.queryByAltText('');
  expect(imageElement).toBeNull();
});
