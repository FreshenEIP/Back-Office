import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { deleteNews, fetchNews } from '../api/news';
import { Image } from '../components/Image';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { TextView } from '../components/Modal/News/TextView';
import config from '../config';

const News = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const getNewsList = useQuery(['news', page, pageSize], () =>
    fetchNews(config.TOKEN, page, pageSize),
  );
  const { data, isLoading, isError, isRefetching } = getNewsList;

  const { mutate } = useMutation(deleteNews, {
    onSuccess: () => {
      toast.success('News supprimé');
      getNewsList.refetch();
    },
    onError: () => {},
  });

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
      <h2 className={'page-header'}>News</h2>
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
          <Box>
            <CustomDialog
              header={'News creation'}
              trigger={<Button variant={'outlined'}>Create</Button>}
            >
              {/* <BrandCreation /> */}
            </CustomDialog>
          </Box>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell align='center'>Images</TableCell>
                <TableCell align='center'>Title</TableCell>
                <TableCell align='center'>Text</TableCell>
                <TableCell align='center'>Creation Date</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>12345678901234567890</TableCell>
                <TableCell align='center'>
                  <Image
                    src={
                      'https://dreamact.eu/uploads/images/blogarticles/fripe-photo.jpg'
                    }
                    alt={'item image'}
                  />
                </TableCell>
                <TableCell>
                  <Typography>Title</Typography>
                </TableCell>
                <TableCell align='center'>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    lacinia quam congue ex laoreet aliquam.
                  </Typography>
                  <CustomDialog
                    header={'Text'}
                    trigger={<Button>View more</Button>}
                  >
                    <TextView />
                  </CustomDialog>
                </TableCell>
                <TableCell align='center'>20/09/2022</TableCell>
                <TableCell align='center'>
                  <Button>Remove</Button>
                </TableCell>
              </TableRow>
              {/* {isLoading || isRefetching ? (
                <></>
              ) : (
                data.map((news: any, idx: number) => {
                  return (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align='center'>
                        <Button
                          onClick={() =>
                            mutate({ token: config.TOKEN, _id: news._id })
                          }
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )} */}
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

export default News;
