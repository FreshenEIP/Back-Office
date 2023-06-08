import styled from '@emotion/styled';
import {
  MenuItem,
  Paper,
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
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCustomers } from '../api/customers';
import { Chip as UserChip } from '../components/User/Chip';
import { Customers as User } from '../interface/customer/customer';

const Customers = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const [type, setType] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const getUserList = useQuery(
    ['customers', page, pageSize, type, username],
    () =>
      fetchCustomers(
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzOTUzMTI2Y2VmZmJhMWMwMjIzN2UiLCJlbWFpbCI6ImFsZXhpcy5mYWJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRkTUV6UmJ5cVE4MXZ1bXVoUVBKb3N1b2cvTjlkc0R0NS5FcndqeklMdmxIbzV6NUxELzNVLiIsInVzZXJuYW1lIjoidGVycnk5NCIsInJvbGVzIjpbImZyZXNoZW46dXNlciIsImZyZXNoZW46YWRtaW4iXSwiYmFubmVkIjpmYWxzZSwicHJpdmFjeSI6InB1YmxpYyIsImFjdGl2ZSI6ZmFsc2UsImxvY2FsZSI6bnVsbCwiY3JlYXRpb25EYXRlIjoiMjAyMy0wNS0wNFQxMToyMToyMS4wNjdaIiwicHJvdmlkZXIiOiJlbWFpbCIsImRlc2NyaXB0aW9uIjoiIiwiZm9sbG93IjpbXSwiZm9sbG93ZXJzIjpbXSwiYmxvY2siOltdLCJmcmlwZXJpZSI6ZmFsc2UsImlhdCI6MTY4NjE4ODQ3MCwiZXhwIjoxNjg2Mjc0ODcwfQ.zRJRhdGdNFismdjfvSjGW4cv3ZTVbQtzCAIuRDgcRBg',
        page,
        pageSize,
        type,
        username,
      ),
  );

  const { data, isLoading, isRefetching, isError } = getUserList;

  const handleChangeType = useCallback(
    (e) => {
      setType(e.target.value);
      getUserList.refetch();
    },
    [getUserList],
  );

  const handleChangeUsername = useCallback(
    (e) => {
      setUsername(e.target.value);
      getUserList.refetch();
    },
    [getUserList],
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
      <h2 className={'page-header'}>Users</h2>
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
          <TextField
            size='small'
            label='Username'
            value={username}
            onChange={handleChangeUsername}
          />
          <TextField
            size='small'
            select
            label='Type'
            sx={{ minWidth: '120px' }}
            value={type}
            onChange={handleChangeType}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='true'>Friperie</MenuItem>
            <MenuItem value='false'>User</MenuItem>
          </TextField>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Friperie</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Follower</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Creation Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((user: User, idx: number) => {
                  return (
                    <TableRow key={user._id}>
                      <TableCell align='center'>
                        <UserChip user={user} clickable={true} />
                      </TableCell>
                      <TableCell>{user.friperie.toString()}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.follow.length}</TableCell>
                      <TableCell>{user.followers.length}</TableCell>
                      <TableCell>
                        {dayjs(user.creationDate).format('DD-MM-YYYY hh:mm:ss')}
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

export default Customers;
