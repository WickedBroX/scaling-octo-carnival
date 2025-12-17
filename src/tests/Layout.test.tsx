import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import { describe, it, expect } from 'vitest';

describe('Layout Navigation', () => {
  it('renders all 5 navigation items in the correct order', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    // Get all navigation links
    const links = screen.getAllByRole('link');

    // We expect 5 links in the bottom navigation
    expect(links).toHaveLength(5);

    // Verify correct order and paths
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/search');
    expect(links[2]).toHaveAttribute('href', '/create');
    expect(links[3]).toHaveAttribute('href', '/discovery');
    expect(links[4]).toHaveAttribute('href', '/profile');
  });
});
