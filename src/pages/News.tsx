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
import dayjs from 'dayjs';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { deleteNews, fetchNews } from '../api/news';
import { Image } from '../components/Image';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { TextView } from '../components/Modal/News/TextView';
import NewsCreation from '../components/Modal/News/addNews';
import NewsUpdate from '../components/Modal/News/updateNews';
import { Chip } from '../components/User/Chip';
import { useAppSelector } from '../redux/hooks';

const News = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const getNewsList = useQuery(['news', page, pageSize], () =>
    fetchNews(logReducer.accessToken, page, pageSize),
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

  const handleConfirmation = (newsId: string) => {
    const token = logReducer.accessToken;
    mutate({ token, id: newsId });
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
              <NewsCreation />
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
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((news: any, idx: number) => {
                  return (
                    <TableRow>
                      <TableCell>
                        <Chip user={news.author} />
                      </TableCell>
                      <TableCell align='center'>
                        <Image src={news.image} alt={'item image'} />
                      </TableCell>
                      <TableCell align='center'>
                        <Typography>{news.title}</Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <CustomDialog
                          header={'Text'}
                          trigger={<Button>View more</Button>}
                        >
                          <TextView text={news.text} />
                        </CustomDialog>
                      </TableCell>
                      <TableCell align='center'>
                        {dayjs(news.creationDate).format('DD-MM-YYYY hh:mm:ss')}
                      </TableCell>
                      <TableCell align='center'>
                        <Stack
                          direction={'row'}
                          spacing={2}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          <CustomDialog
                            header={'News update'}
                            trigger={
                              <Button variant={'outlined'}>Update</Button>
                            }
                          >
                            <NewsUpdate
                              date={news.creationDate}
                              id={news._id}
                              title={news.title}
                              text={news.text}
                              image={news.image}
                            />
                          </CustomDialog>
                          <CustomDialog
                            header={`Supprimer ${news.title}`}
                            trigger={
                              <Button variant={'outlined'} color='error'>
                                Delete
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
                                  Êtes-vous sure de vouloir supprimer cette news
                                  ?
                                </Typography>
                                <Button
                                  variant={'outlined'}
                                  color='error'
                                  onClick={() => handleConfirmation(news._id)}
                                >
                                  Confirmer
                                </Button>
                              </Stack>
                            </div>
                          </CustomDialog>
                        </Stack>
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
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default News;
