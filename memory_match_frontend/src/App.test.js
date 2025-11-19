import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header with stats', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('group', { name: /Game statistics/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart game/i })).toBeInTheDocument();
});

test('renders game board grid', () => {
  render(<App />);
  expect(screen.getByRole('grid', { name: /Memory board/i })).toBeInTheDocument();
});
