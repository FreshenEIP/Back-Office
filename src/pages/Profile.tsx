import { Box, Button, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { fetchProfile, updateProfile } from '../api/profile';
import { ConnectedForm } from '../components/ConnectedForm';
import { InputString } from '../components/Input/InputString';
import logAction from '../redux/actions/logAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

interface FormValues {
  username: string;
}

const ProfileUpdate = ({ onSubmit, data }) => {
  return (
    <ConnectedForm>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'row'} width={'100%'} spacing={2}>
            <Box>
              <img
                src={data.profile_picture}
                alt=''
                style={{ height: '50px', width: '50px' }}
              />
            </Box>
            <Box width={'40%'}>
              <InputString
                property={'username'}
                label={'Username'}
                required
                fullWidth
              />
            </Box>
          </Stack>
          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ margin: '1rem 0rem' }}
          >
            Update
          </Button>
        </Form>
      )}
    </ConnectedForm>
  );
};

const Profile = () => {
  const dispatch = useAppDispatch();
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const getProfile = useQuery(['profile'], () =>
    fetchProfile(logReducer.accessToken),
  );

  const { data, isLoading, isError } = getProfile;

  const { mutate } = useMutation(updateProfile, {
    onSuccess: async () => {
      toast.success('Username successfully change');
      getProfile.refetch();
    },
    onError: () => {
      toast.error('Error while updating username');
    },
  });

  const defaultValues = {
    username: '',
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm<FormValues>({ defaultValues });

  useEffect(() => {
    if (!isLoading) {
      methods.setValue('username', data.username);
      dispatch(logAction.ChangeUserName(data.username));
    }
  }, [isLoading, data, methods, dispatch]);

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    const token = logReducer.accessToken;
    mutate({ payload, token });
  };

  return (
    <FormProvider {...methods}>
      <ProfileUpdate onSubmit={onSubmit} data={data} />
    </FormProvider>
  );
};

export default Profile;
