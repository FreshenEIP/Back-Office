import styled from '@emotion/styled';
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchSuggestions } from '../api/suggestion';
import { Chip as UserChip } from '../components/User/Chip';
import { useAppSelector } from '../redux/hooks';

const Suggestions = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const getSuggestionList = useQuery(['suggestions', page, pageSize], () =>
    fetchSuggestions(logReducer.accessToken, page, pageSize),
  );

  const { data, isLoading, isRefetching, isError } = getSuggestionList;

  if (isError) return <div>Error ...</div>;

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  return (
    <>
      <h2 className={'page-header'}>Suggestions</h2>
      <Toolbar
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width={'100%'}
        spacing={2}
      />
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Article</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Comment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((suggestion: any, idx: number) => {
                  return (
                    <TableRow key={suggestion._id}>
                      <TableCell align='center'>
                        <UserChip user={suggestion.user} clickable />
                      </TableCell>
                      <TableCell>
                        <Typography>{suggestion.brand}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{suggestion.article}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{suggestion.price}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{suggestion.comment}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {isLoading ? (
        <></>
      ) : (
        <TablePagination
          component='div'
          showFirstButton
          showLastButton
          count={data!.count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={pageSize}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  );
};

const Toolbar = styled(Stack)`
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Suggestions;
