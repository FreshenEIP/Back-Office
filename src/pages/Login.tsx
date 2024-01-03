import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import toast from 'react-hot-toast';
import { RiLockFill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/user';
import logAction from '../redux/actions/logAction';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);

  useEffect(() => {
    if (logReducer.accessToken !== '') navigate('/dashboard');
  }, [logReducer.accessToken, navigate]);

  const { mutate } = useMutation(login, {
    onSuccess: (res) => {
      navigate('/dashboard');
      dispatch(logAction.LogIn(res.token, ''));
    },
    onError: (error: any) => {
      toast.error(error.response.data.error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      email: data.get('email'),
      password: data.get('password'),
      provider: 'email',
    };
    mutate(payload);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <RiLockFill />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
