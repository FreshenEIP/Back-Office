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
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Chip as BrandChip } from '../components/Brand/Chip';
import BrandCreation from '../components/Modal/Brand/AddBrand';
import { CustomDialog } from '../components/Modal/CustomDialog';
// import { useState } from 'react';

const Brands = () => {
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(25);
  // const token =
  //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg0NGE1ODFkZmFlZDE1NWUzNzhiMmIiLCJlbWFpbCI6ImFsZXhpcy5mYWJhckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRkTjdHeXJlT2dBd2ZjdkVVMldyQ2R1aTZXc1ZQdUt0OG1ZVk9reFd1d0NhOG4yRHg3Qkk1MiIsInVzZXJuYW1lIjoiQWxleGlzIiwicm9sZXMiOlsiZnJlc2hlbjp1c2VyIiwiZnJlc2hlbjphZG1pbiJdLCJiYW5uZWQiOmZhbHNlLCJwcml2YWN5IjoicHVibGljIiwiYWN0aXZlIjpmYWxzZSwibG9jYWxlIjoiZnJfRlIiLCJjcmVhdGlvbkRhdGUiOiIyMDIyLTExLTI4VDA1OjQyOjQ4LjIxMFoiLCJwcm92aWRlciI6ImVtYWlsIiwiZGVzY3JpcHRpb24iOiIiLCJpYXQiOjE2NzI2MzIxNDAsImV4cCI6MTY3MjcxODU0MH0.hY6E2YCBQBhvTAyJ2hN7VEZuQ8e7Xrt-2AzO_C_dJPg';
  // const getCommentList = useQuery(['brands', page, pageSize], () =>
  //   fetchBrands(token, page, pageSize),
  // );
  // const { data, isLoading, isError, isRefetching } = getCommentList;

  // if (isError) return <div>Error ...</div>;

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   setPageSize(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number,
  // ) => {
  //   setPage(newPage);
  // };

  return (
    <>
      <h2 className={'page-header'}>Brands</h2>
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
          {/* <TextField size='small' label='User ID'></TextField>
          <FormControl sx={{ 'min-width': '120px' }} size='small'>
            <InputLabel id='select-status-label'>Status</InputLabel>
            <Select
              labelId='select-status-label'
              id='select-status'
              value={status}
              label='Status'
              onChange={handleChangeStatus}
            >
              <MenuItem value={''}>All</MenuItem>
              <MenuItem value={'opened'}>Opened</MenuItem>
              <MenuItem value={'closed'}>Closed</MenuItem>
            </Select>
          </FormControl>
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
          </TextField> */}
          <Box>
            <CustomDialog
              header={'Brand creation'}
              trigger={<Button variant={'outlined'}>Create</Button>}
            >
              <BrandCreation />
            </CustomDialog>
          </Box>
        </Stack>
      </Toolbar>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={0}>
        <TableContainer sx={{ borderRadius: '6px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Brands</TableCell>
                <TableCell>Articles</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {isLoading || isRefetching ? (
                <></>
              ) : (
                data!.data.map((brand: Brand, idx: number) => {
                  return ( */}
              <TableRow>
                <TableCell align='center'>
                  <BrandChip
                    clickable={false}
                    brand={{
                      _id: '1234',
                      brand: 'H&M',
                      name: 'H&M',
                      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png',
                      articles: [],
                      price: 0,
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button>Remove</Button>
                </TableCell>
              </TableRow>
              {/* );
                })
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* {isLoading ? (
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
      )} */}
    </>
  );
};

const Toolbar = styled(Stack)`
  background: white;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Brands;
