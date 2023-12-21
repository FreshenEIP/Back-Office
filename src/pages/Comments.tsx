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
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { fetchComments, removeComment } from '../api/comments';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Chip as UserChip } from '../components/User/Chip';
import { Comment } from '../interface/comment/comment';
import { useAppSelector } from '../redux/hooks';

const Comments = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const getCommentList = useQuery(['comments', page, pageSize], () =>
    fetchComments(logReducer.accessToken, page, pageSize),
  );
  const { data, isLoading, isError, isRefetching } = getCommentList;

  const { mutate } = useMutation(removeComment, {
    onSuccess: (res) => {
      toast.success('Comment succesfuly deleted');
    },
    onError: () => {
      toast.error('Error while deleting comment');
    },
  });

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

  const handleConfirmation = (commentId) => {
    const token = logReducer.accessToken;
    mutate({ token, undefined, commentId });
  };

  return (
    <>
      <h2 className={'page-header'}>Comments</h2>
      <Toolbar
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        width={'100%'}
        spacing={2}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={2}
        ></Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Like</TableCell>
                <TableCell>Reply</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((comment: Comment, idx: number) => {
                  return (
                    <TableRow>
                      <TableCell align='center'>
                        {comment.user === undefined ? (
                          <></>
                        ) : (
                          <UserChip user={comment.user} clickable={false} />
                        )}
                      </TableCell>
                      <TableCell>{comment.message}</TableCell>
                      <TableCell>{comment.like.length}</TableCell>
                      <TableCell>{comment.reply.length}</TableCell>
                      <TableCell>
                        <div>
                          {dayjs(comment.createdAt).format(
                            'DD-MM-YYYY hh:mm:ss',
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <>
                          <CustomDialog
                            header={'Supprimer commentaire'}
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
                                  Êtes-vous sure de vouloir supprimer ce
                                  commentaire ?
                                </Typography>
                                <Typography>{comment.message}</Typography>
                                <Button
                                  variant={'outlined'}
                                  color='error'
                                  onClick={() =>
                                    handleConfirmation(comment._id)
                                  }
                                >
                                  Confirmer
                                </Button>
                              </Stack>
                            </div>
                          </CustomDialog>
                        </>
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

export default Comments;
