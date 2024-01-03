/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Comments from '../src/pages/Comments';
import { useFetchComment } from '../src/query/Comments';
import wrapper from './wrapper';

const mockedUseCommentsQuery = useFetchComment;
jest.mock('../src/query/Comments.tsx');

describe('Comments component', () => {
  describe('Comments component state', () => {
    it('Displays the loading view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Comments />, { wrapper });
      expect(screen.getByTestId('comments-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Comments />, { wrapper });
      expect(screen.getByTestId('comments-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Comments />, { wrapper });
      expect(screen.getByTestId('comments-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('Comments component data', () => {
    it('displays one Comments', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
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
              reply: ['', '', ''],
              like: ['', ''],
              message: "c'est une super marque",
            },
          ],
        },
      }));
      render(<Comments />, { wrapper });
      expect(screen.getByText("c'est une super marque")).toBeVisible();
      expect(screen.getByText('2')).toBeVisible();
      expect(screen.getByText('3')).toBeVisible();
      const deleteButton = screen.getByRole('button', {
        name: /delete/i,
      });
      expect(deleteButton).toBeVisible();
      expect(deleteButton).toHaveClass('MuiButton-outlinedError');
    });
    it('displays multiple Comments', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 2,
          data: [
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
              reply: ['', '', ''],
              like: ['', ''],
              message: "c'est une super marque",
            },
            {
              _id: '6452634af26a86ebb1a1d597',
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
              reply: ['', '', ''],
              like: ['', ''],
              message: "c'est une super marque",
            },
          ],
        },
      }));
      render(<Comments />, { wrapper });
      expect(
        screen.getAllByTestId('comments-rows').length,
      ).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Comments button click', () => {
    it('Prompt comments delete', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
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
              reply: ['', '', ''],
              like: ['', ''],
              message: "c'est une super marque",
            },
          ],
        },
      }));
      render(<Comments />, { wrapper });
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      fireEvent.click(deleteButton);
      expect(
        screen.getByText(
          'Êtes-vous sure de vouloir supprimer ce commentaire ?',
        ),
      ).toBeVisible();
      const confirmButton = screen.getByRole('button', { name: /confirmer/i });
      expect(confirmButton).toBeVisible();
      expect(confirmButton).toHaveClass('MuiButton-outlinedError');
    });
  });
});
