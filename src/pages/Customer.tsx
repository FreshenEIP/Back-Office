import {
  Avatar,
  Button,
  Chip,
  Grid,
  Paper as MuiPaper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import toast from 'react-hot-toast';
import { RiShieldCheckFill, RiSpam3Fill } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import { banUser } from '../api/customers';
import { Image } from '../components/Image';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { useFetchCustomerId } from '../query/Customers';
import { useFetchPosts } from '../query/Posts';
import { useAppSelector } from '../redux/hooks';

const Posts = ({ userId }) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const getPost = useFetchPosts(logReducer.accessToken, userId);

  const { data, isLoading, isRefetching, isError } = getPost;

  if (isError) return <div data-testid='post-error'>Error ...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='post-loading'>Loading...</div>;

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell>Creation date</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Like</TableCell>
          <TableCell>Content</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data!.data.map((post: any, idx: number) => {
          return (
            <TableRow key={`posts-${post._id}`}>
              <TableCell>{post._id}</TableCell>
              <TableCell>
                {dayjs(post.created_at).format('DD-MM-YYYY hh:mm:ss')}
              </TableCell>
              <TableCell>{post.description}</TableCell>
              <TableCell>{post.liked.length}</TableCell>
              <TableCell>
                <Image src={post.photos[0]} alt='' />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const Customer = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const { userId } = useParams();

  const getUser = useFetchCustomerId(logReducer.accessToken, userId);
  const { mutate } = useMutation(banUser, {
    onSuccess: (res) => {
      toast.success('Action successfuly done');
    },
    onError: () => {
      toast.error('Error while banning user');
    },
  });

  const handleConfirmation = (userId, block) => {
    const token = logReducer.accessToken;
    mutate({ userId, block, token });
  };

  const { data, isLoading, isRefetching, isError } = getUser;

  if (isError) return <div data-testid='user-error'>Error ...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='user-loading'>Loading...</div>;

  return (
    <>
      {
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Header item xs={12}>
            <MuiPaper variant='outlined'>
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
              >
                <Stack direction='row'>
                  <Cover cover={''}>
                    <Avatar
                      alt={data.username}
                      src={data.profile_picture}
                      sx={{ width: '120px', height: '120px' }}
                    />
                  </Cover>
                  <Stack direction='column' justifyContent='center' spacing={1}>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <Typography variant='h4'>{data.username}</Typography>
                      {data.banned ? (
                        <RiSpam3Fill color='#BA0F30' />
                      ) : (
                        <RiShieldCheckFill color='#00A300' />
                      )}
                      <Chip
                        variant='outlined'
                        size='small'
                        label={`Following: ${data.follow.length}`}
                        sx={{ textTransform: 'capitalize' }}
                      />
                      <Chip
                        variant='outlined'
                        size='small'
                        label={`Followers: ${data.followers.length}`}
                      />
                    </Stack>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Chip
                        variant='outlined'
                        size='small'
                        label={data.privacy}
                        sx={{ textTransform: 'capitalize' }}
                        color={data.privacy === 'private' ? 'error' : 'success'}
                      />
                      <Chip
                        variant='outlined'
                        size='small'
                        label={data.friperie ? 'Friperie' : 'Fripeur'}
                        sx={{ textTransform: 'capitalize' }}
                        color={data.friperie === true ? 'success' : 'error'}
                      />
                      <Chip
                        variant='outlined'
                        size='small'
                        label={data.email}
                      />
                      <>
                        <CustomDialog
                          header={`Ban ${data.username}`}
                          trigger={
                            <Button variant={'outlined'} color='error'>
                              {data.banned ? <>Unban</> : <>Ban</>}
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
                                {data.banned ? <>Unban</> : <>Ban</>} cet
                                utilisateur ({data.username}) ?
                              </Typography>
                              <Button
                                variant={'outlined'}
                                color='error'
                                onClick={() =>
                                  handleConfirmation(data._id, data.banned)
                                }
                              >
                                Confirmer
                              </Button>
                            </Stack>
                          </div>
                        </CustomDialog>
                      </>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </MuiPaper>
          </Header>
          <Grid item xs={12}>
            <MuiPaper variant={'outlined'}>
              <Typography variant='h6' style={{ marginBottom: '1rem' }}>
                Posts
              </Typography>
              <Posts userId={data._id} />
            </MuiPaper>
          </Grid>
        </Grid>
      }
    </>
  );
};

export default Customer;

const Header = styled(Grid)`
  padding: 0rem 0.5rem;
`;

interface CoverProps {
  cover: string;
}

const Cover = styled(MuiPaper)<CoverProps>`
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
  background: url(${(p) => p.cover}) no-repeat center/cover;
  padding: 0rem 0.5rem 0rem 8rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 8rem;
  width: 25rem;
`;
