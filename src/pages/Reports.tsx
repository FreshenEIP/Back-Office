import {
  Button,
  Chip,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Chip as UserChip } from '../components/User/Chip';

const Reports = () => {
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
          <TextField
            size='small'
            select
            label='Severity'
            sx={{ minWidth: '120px' }}
          >
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='low'>Low</MenuItem>
            <MenuItem value='medium'>Medium</MenuItem>
            <MenuItem value='high'>High</MenuItem>
            <MenuItem value='urgent'>Urgent</MenuItem>
          </TextField>
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
                <TableCell>Severity</TableCell>
                <TableCell>Reported type</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Creation Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {isLoading || isRefetching ? (
                    <Placeholder rows={pageSize} />
                  ) : (
                    data!.users.map((user: User, idx: number) => {
                      return ( */}
              <TableRow>
                <TableCell align='center'>
                  <UserChip
                    user={{
                      _id: '1234',
                      username: 'Alexis',
                      discriminator: '1234',
                      avatar:
                        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Favatar&psig=AOvVaw29lflXCXNjVlbG0b2NQ9UU&ust=1667280187600000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCLDW_evcifsCFQAAAAAdAAAAABAE',
                      locale: 'FR_fr',
                      banned: false,
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Chip label='Low' color='info' />
                  <Chip label='Medium' color='success' />
                  <Chip label='High' color='warning' />
                  <Chip label='Urgent' color='error' />
                </TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>
                  <div>{dayjs(new Date()).format('DD/MM/YYYY - HH:mm:ss')}</div>
                </TableCell>
                <TableCell>
                  <Button>Take actions</Button>
                </TableCell>
              </TableRow>
              {/* );
                    })
                  )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
