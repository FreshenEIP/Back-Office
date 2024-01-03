import styled from '@emotion/styled';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchFriperie } from '../query/Friperie';
import { useAppSelector } from '../redux/hooks';

const Friperie = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const getUserList = useFetchFriperie(logReducer.accessToken, 0, 25);

  const { data, isLoading, isRefetching, isError } = getUserList;

  if (isError) return <div data-testid='friperie-error'>Error...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='friperie-loading'>Loading...</div>;

  return (
    <>
      <h2 className={'page-header'}>Friperie</h2>
      <Toolbar
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width={'100%'}
        spacing={2}
      ></Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data!.map((friperie: any, idx: number) => {
                return (
                  <TableRow data-testid={'friperie-rows'} key={friperie._id}>
                    <TableCell>
                      <Typography>{friperie.name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`https://www.google.fr/maps/@${friperie.position.lat},${friperie.position.lng},14z?entry=ttu`}
                        target='_blank'
                      >
                        Voir la position
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

const Toolbar = styled(Stack)`
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Friperie;
