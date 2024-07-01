import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Login from './Login';

describe('Login', () => {

   test('renders Login component', () => {
      render(<Login />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
   });
});