/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Brands from '../src/pages/Brands';
import { useFetchBrands } from '../src/query/Brands';
import wrapper from './wrapper';

const mockedUseBrandsQuery = useFetchBrands;
jest.mock('../src/query/Brands.tsx');

describe('Brands component', () => {
  describe('Brands component state', () => {
    it('Displays the loading view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Brands />, { wrapper });
      expect(screen.getByTestId('brands-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Brands />, { wrapper });
      expect(screen.getByTestId('brands-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Brands />, { wrapper });
      expect(screen.getByTestId('brands-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('Brands component data', () => {
    it('displays one Brands', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: false,
        data: [
          {
            _id: '645134905eec8a5e57bbb93f',
            brand: 'Adidas',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
            articles: { hoodie: { cost: 110, coton: 1, water: 1 } },
          },
        ],
      }));
      render(<Brands />, { wrapper });
      expect(screen.getByText('Adidas')).toBeVisible();
      expect(screen.getByText('1')).toBeVisible();
      const detailsButton = screen.getByRole('button', {
        name: /view details/i,
      });
      expect(detailsButton).toBeVisible();
      const removeButton = screen.getByRole('button', { name: /remove/i });
      expect(removeButton).toBeVisible();
      expect(removeButton).toHaveClass('MuiButton-outlinedPrimary');
      const updateButton = screen.getByRole('button', { name: /update/i });
      expect(updateButton).toBeVisible();
      expect(updateButton).toHaveClass('MuiButton-outlinedPrimary');
    });
    it('displays multiple Brands', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: false,
        data: [
          {
            _id: '645134905eec8a5e57bbb93f',
            brand: 'Adidas',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
            articles: { hoodie: { cost: 110, coton: 1, water: 1 } },
          },
          {
            _id: '63af8e28ad802bb61ae4d774',
            brand: 'H&M',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
            articles: { hoodie: { cost: 110, coton: 1, water: 1 } },
          },
        ],
      }));
      render(<Brands />, { wrapper });
      expect(
        screen.getAllByTestId('brands-rows').length,
      ).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Brands button click', () => {
    it('Prompt brand creation', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: false,
        data: [
          {
            _id: '645134905eec8a5e57bbb93f',
            brand: 'Adidas',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
            articles: { hoodie: { cost: 110, coton: 1, water: 1 } },
          },
        ],
      }));
      render(<Brands />, { wrapper });
      const createButton = screen.getByRole('button', { name: /create/i });
      fireEvent.click(createButton);
      expect(screen.getByRole('textbox', { name: /Name/i })).toBeVisible();
      expect(screen.getByRole('textbox', { name: /Logo/i })).toBeVisible();
    });
    it('Prompt brand update', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: false,
        data: [
          {
            _id: '645134905eec8a5e57bbb93f',
            brand: 'Adidas',
            photo:
              'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
            articles: { hoodie: { cost: 110, coton: 1, water: 1 } },
          },
        ],
      }));
      render(<Brands />, { wrapper });
      const updateButton = screen.getByRole('button', { name: /update/i });
      fireEvent.click(updateButton);
      expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
        'Adidas',
      );
      expect(screen.getByRole('textbox', { name: /logo/i })).toHaveValue(
        'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
      );
    });
  });
});
