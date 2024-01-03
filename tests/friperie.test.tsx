/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Friperie from '../src/pages/Friperie';
import { useFetchFriperie } from '../src/query/Friperie';
import wrapper from './wrapper';

const mockedUseFriperieQuery = useFetchFriperie;
jest.mock('../src/query/Friperie.tsx');

describe('Friperie component', () => {
  describe('Friperie component state', () => {
    it('Displays the loading view', () => {
      mockedUseFriperieQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Friperie />, { wrapper });
      expect(screen.getByTestId('friperie-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseFriperieQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Friperie />, { wrapper });
      expect(screen.getByTestId('friperie-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseFriperieQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Friperie />, { wrapper });
      expect(screen.getByTestId('friperie-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('Friperie component data', () => {
    it('displays one Friperie', () => {
      mockedUseFriperieQuery.mockImplementation(() => ({
        isLoading: false,
        data: [
          {
            _id: '63af8e28ad802bb61ae4d774',
            name: 'Friper',
            position: { lat: 48.83628600210553, lng: 2.3268004394326716 },
          },
        ],
      }));
      render(<Friperie />, { wrapper });
      expect(screen.getByText('Friper')).toBeInTheDocument();
    });
  });
});
