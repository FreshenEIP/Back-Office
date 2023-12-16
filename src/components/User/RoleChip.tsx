import { Stack, Typography } from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { updateCustomerRoles } from '../../api/customers';
import { useAppSelector } from '../../redux/hooks';

export const RoleChip = ({ userList, userId, roles }) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);

  const { mutate } = useMutation(updateCustomerRoles, {
    onSuccess: (res) => {
      toast.success('User roles successfully updated');
      userList.refetch();
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const handleUpdate = async (roles) => {
    const token = logReducer.accessToken;
    mutate({ token, userId, roles });
  };

  return (
    <Stack alignItems={'start'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
      >
        <RiCheckboxCircleLine
          color={roles.includes('freshen:user') ? 'green' : 'red'}
          onClick={() => handleUpdate('freshen:user')}
        />
        <Typography>User</Typography>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
      >
        <RiCheckboxCircleLine
          color={roles.includes('freshen:author') ? 'green' : 'red'}
          onClick={() => handleUpdate('freshen:author')}
        />
        <Typography>Author</Typography>
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={1}
      >
        <RiCheckboxCircleLine
          color={roles.includes('freshen:admin') ? 'green' : 'red'}
          onClick={() => handleUpdate('freshen:admin')}
        />
        <Typography>Admin</Typography>
      </Stack>
    </Stack>
  );
};
