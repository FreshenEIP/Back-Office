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
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchReports } from '../api/reports';
import { Chip as UserChip } from '../components/User/Chip';
import config from '../config';
import { Report } from '../interface/report/report';

const Reports = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [status, setStatus] = useState('');
  const getReportList = useQuery(['reports', page, pageSize, status], () =>
    fetchReports(config.TOKEN, page, pageSize, status),
  );
  const { data, isLoading, isError, isRefetching } = getReportList;

  const handleChangeStatus = useCallback(
    (e) => {
      setStatus(e.target.value);
      getReportList.refetch();
    },
    [getReportList],
  );

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
          <TextField size='small' label='User ID'></TextField>
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
          <TextField
            size='small'
            select
            label='Type'
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='user'>User</MenuItem>
            <MenuItem value='post'>Post</MenuItem>
            <MenuItem value='comment'>Comment</MenuItem>
          </TextField>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Reported type</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((report: Report, idx: number) => {
                  return (
                    <TableRow>
                      <TableCell align='center'>
                        <UserChip
                          user={report.reportedUser}
                          clickable={false}
                        />
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
                        <Button>Remove</Button>
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
  background: white;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Reports;
