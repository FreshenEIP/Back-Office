/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Customers from '../src/pages/Customers';
import { useFetchCustomers } from '../src/query/Customers';
import wrapper from './wrapper';

const mockedUseUsersQuery = useFetchCustomers;
jest.mock('../src/query/Customers.tsx');

describe('Users component', () => {
  describe('User component state', () => {
    it('Displays the loading view', () => {
      mockedUseUsersQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Customers />, { wrapper });
      expect(screen.getByTestId('users-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseUsersQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Customers />, { wrapper });
      expect(screen.getByTestId('users-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseUsersQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Customers />, { wrapper });
      expect(screen.getByTestId('users-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });
  describe('User component data', () => {
    describe('User component data / User', () => {
      it('Displays one standard user', () => {
        mockedUseUsersQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
            count: 1,
            data: [
              {
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
            ],
          },
        }));
        render(<Customers />, { wrapper });
        expect(screen.getByText('Antoine')).toBeVisible();
        const banButton = screen.getByRole('button', { name: /ban/i });
        expect(banButton).toBeVisible();
        expect(banButton).toHaveClass('MuiButton-outlinedError');
      });

      it('Displays one banned user', () => {
        mockedUseUsersQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
            count: 1,
            data: [
              {
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
            ],
          },
        }));
        render(<Customers />, { wrapper });
        expect(screen.getByText('Antoine')).toBeVisible();
        const banButton = screen.getByRole('button', { name: /unban/i });
        expect(banButton).toBeVisible();
        expect(banButton).toHaveClass('MuiButton-outlinedSuccess');
      });

      it('Displays multiple user', () => {
        mockedUseUsersQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
            count: 2,
            data: [
              {
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
              {
                _id: '6572f3e81ccf8acba77596ac',
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
                username: 'Alexis',
                locale: null,
                roles: ['freshen:user'],
              },
            ],
          },
        }));
        render(<Customers />, { wrapper });
        expect(
          screen.getAllByTestId('customers-rows').length,
        ).toBeGreaterThanOrEqual(2);
      });
    });

    describe('User component data / Friperie', () => {
      it('Displays one friperie user', () => {
        mockedUseUsersQuery.mockImplementation(() => ({
          isLoading: false,
          data: {
            count: 1,
            data: [
              {
                _id: '645134905eec8a5e57bbb93f',
                banned: false,
                creationDate: '2023-05-02T16:04:32.680Z',
                description: 'null',
                email: 'antoine@vergez.me',
                follow: [],
                followers: [],
                friperie: true,
                privacy: 'public',
                profile_picture:
                  'https://firebasestorage.googleapis.com/v0/b/freshen-bc365.appspot.com/o/users%2F645134905eec8a5e57bbb93f%2Fprofile_picture.png?alt=media&token=cc2a0f45-7a1e-41cc-bde1-33f69de20944',
                username: 'Antoine',
                locale: null,
                roles: ['freshen:user'],
              },
            ],
          },
        }));
        render(<Customers />, { wrapper });
        expect(screen.getByText('Antoine')).toBeVisible();
        expect(screen.getByText('true')).toBeVisible();
      });
    });
  });

  describe('User button click', () => {
    it('Prompt user ban', () => {
      mockedUseUsersQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
            {
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
          ],
        },
      }));
      render(<Customers />, { wrapper });
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
      mockedUseUsersQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
            {
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
          ],
        },
      }));
      render(<Customers />, { wrapper });
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
