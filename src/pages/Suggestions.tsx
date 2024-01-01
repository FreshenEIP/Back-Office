import styled from '@emotion/styled';
import {
  Button,
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
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { deleteSuggestion } from '../api/suggestion';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Chip as UserChip } from '../components/User/Chip';
import { useFetchSuggestions } from '../query/Suggestions';
import { useAppSelector } from '../redux/hooks';

const Suggestions = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const getSuggestionList = useFetchSuggestions(
    logReducer.accessToken,
    page,
    pageSize,
  );

  const { data, isLoading, isRefetching, isError } = getSuggestionList;

  const { mutate } = useMutation(deleteSuggestion, {
    onSuccess: () => {
      toast.success('Suggestion supprimé');
      getSuggestionList.refetch();
    },
    onError: () => {},
  });

  if (isError) return <div data-testid='suggestions-error'>Error ...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='suggestions-loading'>Loading...</div>;

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

  const handleConfirmation = (suggestionId: string) => {
    const token = logReducer.accessToken;
    mutate({ token, id: suggestionId });
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
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data!.data.map((suggestion: any, idx: number) => {
                return (
                  <TableRow key={suggestion._id} data-testid='suggestions-rows'>
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
                    <TableCell>
                      <CustomDialog
                        header={`Supprimer`}
                        trigger={
                          <Button variant={'outlined'} color='error'>
                            Delete
                          </Button>
                        }
                      >
                        <div>
                          <Stack
                            justifyContent={'center'}
                            alignItems={'center'}
                            spacing={2}
                          >
                            <Typography>
                              Êtes-vous sure de vouloir supprimer cette
                              Suggestions ?
                            </Typography>
                            <Button
                              variant={'outlined'}
                              color='error'
                              onClick={() => handleConfirmation(suggestion._id)}
                            >
                              Confirmer
                            </Button>
                          </Stack>
                        </div>
                      </CustomDialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {
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
      }
    </>
  );
};

const Toolbar = styled(Stack)`
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Suggestions;
