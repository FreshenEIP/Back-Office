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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchBrands } from '../api/brands';
import { Chip as BrandChip } from '../components/Brand/Chip';
import BrandCreation from '../components/Modal/Brand/AddBrand';
import BrandView from '../components/Modal/Brand/BrandView';
import { CustomDialog } from '../components/Modal/CustomDialog';
import config from '../config';
import { Brand } from '../interface/brand/brand';

const Brands = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const getBrandsList = useQuery(['brands', page, pageSize], () =>
    fetchBrands(config.TOKEN, page, pageSize),
  );
  const { data, isLoading, isError, isRefetching } = getBrandsList;

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
                <TableCell align='center'>Articles</TableCell>
                <TableCell align='center'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading || isRefetching ? (
                <></>
              ) : (
                data.map((brand: Brand, idx: number) => {
                  return (
                    <TableRow>
                      <TableCell align='center'>
                        <BrandChip
                          clickable={false}
                          brand={{
                            _id: brand._id,
                            brand: brand.brand,
                            photo: brand.photo,
                            articles: brand.articles,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Stack
                          spacing={2}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          {Object.keys(brand.articles).length}
                          <CustomDialog
                            header={'Articles'}
                            trigger={<Button>View details</Button>}
                          >
                            <BrandView articles={brand.articles} />
                          </CustomDialog>
                        </Stack>
                      </TableCell>
                      <TableCell align='center'>
                        <Button>Remove</Button>
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
  background: white;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Brands;
