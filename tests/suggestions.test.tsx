/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Suggestions from '../src/pages/Suggestions';
import { useFetchSuggestions } from '../src/query/Suggestions';
import wrapper from './wrapper';

const mockedUseSuggestionsQuery = useFetchSuggestions;
jest.mock('../src/query/Suggestions.tsx');

describe('Suggestions component', () => {
  describe('Suggestions component state', () => {
    it('Displays the loading view', () => {
      mockedUseSuggestionsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Suggestions />, { wrapper });
      expect(screen.getByTestId('suggestions-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseSuggestionsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Suggestions />, { wrapper });
      expect(screen.getByTestId('suggestions-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseSuggestionsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Suggestions />, { wrapper });
      expect(screen.getByTestId('suggestions-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('Suggestions component data', () => {
    it('displays one suggestion', () => {
      mockedUseSuggestionsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
            {
              _id: '645509f6d402b7521c48299b',
              user: {
                _id: '645134905eec8a5e57bbb93f',
                banned: false,
                creationDate: '2023-05-02T16:04:32.680Z',
                description: 'null',
                email: 'antoine@vergez.me',
                follow: [],
                followers: [],
                friperie: false,
                privacy: 'public',
                profile_picture:
                  'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
                username: 'Antoine',
                locale: null,
                roles: ['freshen:user'],
              },
              brand: 'H & M ',
              article: 'Casquette coréene',
              price: 12,
              comment: 'no comment',
            },
          ],
        },
      }));
      render(<Suggestions />, { wrapper });
      expect(screen.getByText('Antoine')).toBeInTheDocument();
      expect(screen.getByText('12')).toBeInTheDocument();
      expect(screen.getByText('H & M')).toBeInTheDocument();
      expect(screen.getByText('Casquette coréene')).toBeInTheDocument();
      expect(screen.getByText('no comment')).toBeInTheDocument();
    });

    it('displays multiple suggestions', () => {
      mockedUseSuggestionsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 2,
          data: [
            {
              _id: '645509f6d402b7521c48299b',
              user: {
                _id: '645134905eec8a5e57bbb93f',
                banned: false,
                creationDate: '2023-05-02T16:04:32.680Z',
                description: 'null',
                email: 'antoine@vergez.me',
                follow: [],
                followers: [],
                friperie: false,
                privacy: 'public',
                profile_picture:
                  'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
                username: 'Antoine',
                locale: null,
                roles: ['freshen:user'],
              },
              brand: 'H & M ',
              article: 'Casquette coréene',
              price: 12,
              comment: 'no comment',
            },
            {
              _id: '650c02bd82717752aa785410',
              user: {
                _id: '645134905eec8a5e57bbb93f',
                banned: false,
                creationDate: '2023-05-02T16:04:32.680Z',
                description: 'null',
                email: 'antoine@vergez.me',
                follow: [],
                followers: [],
                friperie: false,
                privacy: 'public',
                profile_picture:
                  'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
                username: 'Antoine',
                locale: null,
                roles: ['freshen:user'],
              },
              uuid: '6452634af26a86ebb1a1d597',
              brand: 'Zaezaeaze',
              article: 'no article',
              price: 0,
              comment: "c'est une super marque",
            },
          ],
        },
      }));
      render(<Suggestions />, { wrapper });
      expect(
        screen.getAllByTestId('suggestions-rows').length,
      ).toBeGreaterThanOrEqual(2);
    });
  });
});
