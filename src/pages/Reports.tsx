import {
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { removeComment } from '../api/comments';
import { removePost } from '../api/post';
import { Image } from '../components/Image';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Chip as UserChip } from '../components/User/Chip';
import { Report } from '../interface/report/report';
import { useFetchReports } from '../query/Reports';
import { useAppSelector } from '../redux/hooks';

const Reports = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [status, setStatus] = useState('');
  const getReportList = useFetchReports(
    logReducer.accessToken,
    page,
    pageSize,
    status,
  );
  const { data, isLoading, isError, isRefetching } = getReportList;

  const handleChangeStatus = useCallback(
    (e) => {
      setStatus(e.target.value);
      getReportList.refetch();
    },
    [getReportList],
  );

  const { mutate: mutatePost } = useMutation(removePost, {
    onSuccess: (res) => {
      toast.success('Post succesfuly deleted');
    },
    onError: () => {
      toast.error('Error while deleting post');
    },
  });

  const { mutate: mutateComment } = useMutation(removeComment, {
    onSuccess: (res) => {
      toast.success('Comment succesfuly deleted');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  if (isError) return <div data-testid='reports-error'>Error...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='reports-loading'>Loading...</div>;

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

  const handleConfirmation = (type, reportId, commentId, postId) => {
    const token = logReducer.accessToken;
    if (type === 'comment') mutateComment({ token, reportId, commentId });
    else if (type === 'post') mutatePost({ token, reportId, postId });
  };

  return (
    <>
      <h2 className={'page-header'}>Reports</h2>
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
        >
          <FormControl sx={{ 'min-width': '120px' }} size='small'>
            <InputLabel id='select-status-label'>Status</InputLabel>
            <Select
              labelId='select-status-label'
              id='select-status'
              value={status}
              label='Status'
              onChange={handleChangeStatus}
            >
              <MenuItem value={''}>All</MenuItem>
              <MenuItem value={'opened'}>Opened</MenuItem>
              <MenuItem value={'closed'}>Closed</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Reported User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reported type</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data!.data.map((report: Report, idx: number) => {
                console.log(report);
                if (report.post || report.comment || report.status === 'closed')
                  return (
                    <TableRow key={`report-${report._id}`}>
                      <TableCell align='center'>
                        <UserChip
                          user={report.reporterUser}
                          clickable={false}
                        />
                      </TableCell>
                      <TableCell align='center'>
                        <UserChip user={report.reportedUser} />
                      </TableCell>
                      <TableCell>
                        {report.status === 'opened' ? (
                          <Chip label='Opened' color='success' />
                        ) : (
                          <Chip label='Closed' color='error' />
                        )}
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>Content</TableCell>
                      <TableCell>
                        <div>
                          {dayjs(report.createdAt).format(
                            'DD-MM-YYYY hh:mm:ss',
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.status === 'opened' ? (
                          <>
                            <CustomDialog
                              header={`Supprimer ${report.type}`}
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
                                    Êtes-vous sure de vouloir supprimer ce{' '}
                                    {report.type} ?
                                  </Typography>
                                  {report.type === 'comment' ? (
                                    <>
                                      <Typography>
                                        {report.comment.message}
                                      </Typography>
                                      <Button
                                        variant={'outlined'}
                                        color='error'
                                        onClick={() =>
                                          handleConfirmation(
                                            report.type,
                                            report._id,
                                            report.comment._id,
                                            undefined,
                                          )
                                        }
                                      >
                                        Confirmer
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      {report.post.photos.map((url) => {
                                        return <Image src={url} alt={url} />;
                                      })}
                                      <Button
                                        variant={'outlined'}
                                        color='error'
                                        onClick={() =>
                                          handleConfirmation(
                                            report.type,
                                            report._id,
                                            undefined,
                                            report.post._id,
                                          )
                                        }
                                      >
                                        Confirmer
                                      </Button>
                                    </>
                                  )}
                                </Stack>
                              </div>
                            </CustomDialog>
                          </>
                        ) : (
                          <></>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                else return '';
              })}
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

export default Reports;
