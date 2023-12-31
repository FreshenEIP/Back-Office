import styled from '@emotion/styled';
import {
  Button,
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
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { banUser } from '../api/customers';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Chip as UserChip } from '../components/User/Chip';
import { RoleChip } from '../components/User/RoleChip';
import { Customers as User } from '../interface/customer/customer';
import { useFetchCustomers } from '../query/Customers';
import { useAppSelector } from '../redux/hooks';

const Customers = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(25);
  const [type, setType] = useState<string>('');
  const [roles, setRoles] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const getUserList = useFetchCustomers(
    logReducer.accessToken,
    page,
    pageSize,
    type,
    username,
    roles,
  );

  const { mutate } = useMutation(banUser, {
    onSuccess: (res) => {
      toast.success('Action successfuly done');
    },
    onError: () => {
      toast.error('Error while banning user');
    },
  });

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

  const handleChangeRoles = useCallback(
    (e) => {
      setRoles(e.target.value);
      getUserList.refetch();
    },
    [getUserList],
  );

  if (isError) return <div data-testid='users-error'>Error ...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='users-loading'>Loading...</div>;

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

  const handleConfirmation = (userId, block) => {
    const token = logReducer.accessToken;
    mutate({ userId, block, token });
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
          </TextField>
          <TextField
            size='small'
            select
            label='Roles'
            sx={{ minWidth: '120px' }}
            value={roles}
            onChange={handleChangeRoles}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='user'>User</MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='author'>Author</MenuItem>
          </TextField>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Friperie</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Follower</TableCell>
                <TableCell>Followers</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data!.data.map((user: User, idx: number) => {
                return (
                  <TableRow data-testid={'customers-rows'} key={user._id}>
                    <TableCell align='center'>
                      <UserChip
                        data-testid={`user-${user._id}`}
                        user={user}
                        clickable={true}
                      />
                    </TableCell>
                    <TableCell>
                      <RoleChip
                        userList={getUserList}
                        userId={user._id}
                        roles={user.roles}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack>
                        <Typography>{user.friperie.toString()}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.follow.length}</TableCell>
                    <TableCell>{user.followers.length}</TableCell>
                    <TableCell>
                      {dayjs(user.creationDate).format('DD-MM-YYYY hh:mm:ss')}
                    </TableCell>
                    <TableCell>
                      <>
                        <CustomDialog
                          header={`Ban ${user.username}`}
                          trigger={
                            <Button
                              variant={'outlined'}
                              color={user.banned ? 'success' : 'error'}
                            >
                              {user.banned ? 'Unban' : 'Ban'}
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
                                Êtes-vous sure de vouloir{' '}
                                {user.banned ? <>Unban</> : <>Ban</>} cet
                                utilisateur ({user.username}) ?
                              </Typography>
                              <Button
                                variant={'outlined'}
                                color='error'
                                onClick={() =>
                                  handleConfirmation(user._id, user.banned)
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
    </>
  );
};

const Toolbar = styled(Stack)`
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Customers;
