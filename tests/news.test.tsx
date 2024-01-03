/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import News from '../src/pages/News';
import { useFetchNews } from '../src/query/News';
import wrapper from './wrapper';

const mockedUseBrandsQuery = useFetchNews;
jest.mock('../src/query/News.tsx');

describe('News component', () => {
  describe('News component state', () => {
    it('Displays the loading view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<News />, { wrapper });
      expect(screen.getByTestId('news-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<News />, { wrapper });
      expect(screen.getByTestId('news-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseBrandsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<News />, { wrapper });
      expect(screen.getByTestId('news-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('News component data', () => {
    it('displays one News', () => {
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
      render(<News />, { wrapper });
    });
    it('displays multiple News', () => {
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
      render(<News />, { wrapper });
    });
  });

  describe('News button click', () => {
    it('Prompt news creation', () => {
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
      render(<News />, { wrapper });
      const createButton = screen.getByRole('button', { name: /create/i });
      fireEvent.click(createButton);
      expect(screen.getByRole('textbox', { name: /Name/i })).toBeVisible();
      expect(screen.getByRole('textbox', { name: /Logo/i })).toBeVisible();
    });
    it('Prompt news update', () => {
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
      render(<News />, { wrapper });
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
