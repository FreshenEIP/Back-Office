import {
  Avatar,
  Chip,
  CircularProgress,
  Grid,
  Paper as MuiPaper,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { RiShieldCheckFill, RiSpam3Fill } from 'react-icons/ri';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { fetchCustomerById } from '../api/customers';
import { FetchError } from '../components/FetchError';

export const Customer = () => {
  const { userId }: { userId: string } = useParams();
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDUzOTUzMTI2Y2VmZmJhMWMwMjIzN2UiLCJlbWFpbCI6ImFsZXhpcy5mYWJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRkTUV6UmJ5cVE4MXZ1bXVoUVBKb3N1b2cvTjlkc0R0NS5FcndqeklMdmxIbzV6NUxELzNVLiIsInVzZXJuYW1lIjoidGVycnk5NCIsInJvbGVzIjpbImZyZXNoZW46dXNlciIsImZyZXNoZW46YWRtaW4iXSwiYmFubmVkIjpmYWxzZSwicHJpdmFjeSI6InB1YmxpYyIsImFjdGl2ZSI6ZmFsc2UsImxvY2FsZSI6bnVsbCwiY3JlYXRpb25EYXRlIjoiMjAyMy0wNS0wNFQxMToyMToyMS4wNjdaIiwicHJvdmlkZXIiOiJlbWFpbCIsImRlc2NyaXB0aW9uIjoiIiwiZm9sbG93IjpbXSwiZm9sbG93ZXJzIjpbXSwiYmxvY2siOltdLCJmcmlwZXJpZSI6ZmFsc2UsImlhdCI6MTY4NjE4ODQ3MCwiZXhwIjoxNjg2Mjc0ODcwfQ.zRJRhdGdNFismdjfvSjGW4cv3ZTVbQtzCAIuRDgcRBg';

  const getUser = useQuery(['customer', userId], () =>
    fetchCustomerById(token, userId),
  );

  const { data, isLoading, isError } = getUser;

  if (isError) return <FetchError />;

  // const cloudinary =
  //   'https://res.cloudinary.com/ambergg/image/upload/assets/games/cards/games';
  // const cover = `${cloudinary}/${data!.game}/${data!.mission.type}.jpg`;

  return (
    <>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
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
                    <Stack
                      direction='column'
                      justifyContent='center'
                      spacing={1}
                    >
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
                          color={
                            data.privacy === 'private' ? 'error' : 'success'
                          }
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
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </MuiPaper>
            </Header>
            <Grid item xs={12}></Grid>
          </Grid>
        </>
      )}
    </>
  );
};

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

const Paper = styled(MuiPaper)`
  padding: 1rem;
`;

const Economy = styled(Stack)`
  padding: 1rem;
  width: 180px;
`;
