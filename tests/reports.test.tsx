/**
 * @jest-environment jsdom
 */

// @ts-nocheck
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Report from '../src/pages/Reports';
import { useFetchReports } from '../src/query/Reports';
import wrapper from './wrapper';

const mockedUseCommentsQuery = useFetchReports;
jest.mock('../src/query/Reports.tsx');

describe('Reports component', () => {
  describe('Reports component state', () => {
    it('Displays the loading view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: true,
      }));
      render(<Report />, { wrapper });
      expect(screen.getByTestId('reports-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the refetching view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isRefetching: true,
      }));
      render(<Report />, { wrapper });
      expect(screen.getByTestId('reports-loading')).toBeInTheDocument();
      expect(screen.getByText(/Loading.../i)).toBeVisible();
    });

    it('Displays the error view', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isError: true,
      }));
      render(<Report />, { wrapper });
      expect(screen.getByTestId('reports-error')).toBeInTheDocument();
      expect(screen.getByText(/Error.../i)).toBeVisible();
    });
  });

  describe('Reports component data', () => {
    it('displays one opened Reports', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
            {
              _id: '65955181a2d5d7c91c3cdf11',
              createdAt: 1704284545437,
              description: 'le post 6592bfcbce911bdab34c40de a été signalé',
              post: {
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
              reportedUser: {
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
                username: 'Kylian',
                locale: null,
                roles: ['freshen:user'],
              },
              reporterUser: {
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
              status: 'opened',
              type: 'post',
            },
          ],
        },
      }));
      render(<Report />, { wrapper });
      expect(screen.getByText('Kylian')).toBeVisible();
      expect(screen.getByText('Antoine')).toBeVisible();
      expect(screen.getByText('post')).toBeVisible();
      const deleteButton = screen.getByRole('button', {
        name: /delete/i,
      });
      expect(deleteButton).toBeVisible();
      expect(deleteButton).toHaveClass('MuiButton-outlinedError');
    });

    it('displays one closed Reports', () => {
      mockedUseCommentsQuery.mockImplementation(() => ({
        isLoading: false,
        data: {
          count: 1,
          data: [
            {
              _id: '65955181a2d5d7c91c3cdf11',
              createdAt: 1704284545437,
              description: 'le post 6592bfcbce911bdab34c40de a été signalé',
              post: {
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
              reportedUser: {
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
                username: 'Kylian',
                locale: null,
                roles: ['freshen:user'],
              },
              reporterUser: {
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
              status: 'closed',
              type: 'post',
            },
          ],
        },
      }));
      render(<Report />, { wrapper });
      expect(screen.getByText('Kylian')).toBeVisible();
      expect(screen.getByText('Antoine')).toBeVisible();
      expect(screen.getByText('post')).toBeVisible();
    });
  });
});
