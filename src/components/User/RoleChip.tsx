import { Stack, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { updateCustomerRoles } from '../../api/customers';
import config from '../../config';

export const RoleChip = ({ userList, userId, roles }) => {
  const token = config.TOKEN;

  const { mutate } = useMutation(updateCustomerRoles, {
    onSuccess: (res) => {
      toast.success('User roles successfully updated');
      userList.refetch();
    },
    onError: () => {
      toast.error('Error while updateting user roles');
    },
  });

  const handleUpdate = async (roles) => {
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
