/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Customer from '../src/pages/Customer';
import { useFetchCustomerId } from '../src/query/Customers';
import { useFetchPosts } from '../src/query/Posts';
import wrapper from './wrapper';

const mockedUseUserQuery = useFetchCustomerId;
jest.mock('../src/query/Customers.tsx');
const mockedUsePostsQuery = useFetchPosts;
jest.mock('../src/query/Posts.tsx');

describe('User component', () => {
  describe('User component state', () => {
    it('Displays the loading view (user)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('user-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view (user)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('user-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view (user)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('user-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
    it('Displays the loading view (posts)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
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
      }));
      mockedUsePostsQuery.mockImplementation(() => ({
        isLoading: true,
        data: {
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
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('post-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view (posts)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
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
      }));
      mockedUsePostsQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('post-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view (posts)', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
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
      }));
      mockedUsePostsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Customer />, { wrapper });
      expect(screen.getByTestId('post-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });
  describe('User component data', () => {
    describe('User component data / User', () => {
      it('Displays one standard user', () => {
        mockedUseUserQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
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
        }));
        mockedUsePostsQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
            data: [
              {
                _id: '6592bfcbce911bdab34c40de',
                created_at: '2024-01-01T13:36:11.663Z',
                description: 'test pour thomas',
                ikes: 0,
                liked: [],
                photos: [],
                author: {
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
              },
            ],
          },
        }));
        render(<Customer />, { wrapper });
        expect(screen.getByText('Antoine')).toBeVisible();
        expect(screen.getByText('antoine@vergez.me')).toBeVisible();
        const banButton = screen.getByRole('button', { name: /ban/i });
        expect(banButton).toBeVisible();
        expect(banButton).toHaveClass('MuiButton-outlinedError');
        expect(screen.getByText('6592bfcbce911bdab34c40de')).toBeVisible();
        expect(screen.getByText('test pour thomas')).toBeVisible();
        expect(screen.getByText('01-01-2024 02:36:11')).toBeVisible();
      });
    });
  });

  describe('User button click', () => {
    it('Prompt user ban', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
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
      }));
      mockedUsePostsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          data: [
            {
              _id: '6592bfcbce911bdab34c40de',
              created_at: '2024-01-01T13:36:11.663Z',
              description: 'test pour thomas',
              ikes: 0,
              liked: [],
              photos: [],
              author: {
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
            },
          ],
        },
      }));
      render(<Customer />, { wrapper });
      const banButton = screen.getByRole('button', { name: /ban/i });
      fireEvent.click(banButton);
      expect(
        screen.getByText(
          'Êtes-vous sure de vouloir Ban cet utilisateur (Antoine) ?',
        ),
      ).toBeVisible();
      const confirmButton = screen.getByRole('button', { name: /confirmer/i });
      expect(confirmButton).toBeVisible();
      expect(confirmButton).toHaveClass('MuiButton-outlinedError');
    });
    it('Prompt user unban', () => {
      mockedUseUserQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          _id: '645134905eec8a5e57bbb93f',
          banned: true,
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
      }));
      mockedUsePostsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          data: [
            {
              _id: '6592bfcbce911bdab34c40de',
              created_at: '2024-01-01T13:36:11.663Z',
              description: 'test pour thomas',
              ikes: 0,
              liked: [],
              photos: [],
              author: {
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
            },
          ],
        },
      }));
      render(<Customer />, { wrapper });
      const banButton = screen.getByRole('button', { name: /unban/i });
      fireEvent.click(banButton);
      expect(
        screen.getByText(
          'Êtes-vous sure de vouloir Unban cet utilisateur (Antoine) ?',
        ),
      ).toBeVisible();
      const confirmButton = screen.getByRole('button', { name: /confirmer/i });
      expect(confirmButton).toBeVisible();
      expect(confirmButton).toHaveClass('MuiButton-outlinedError');
    });
  });
});
