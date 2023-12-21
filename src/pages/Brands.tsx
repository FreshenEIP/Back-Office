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
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQuery } from 'react-query';
import { deleteBrand, fetchBrands } from '../api/brands';
import { Chip as BrandChip } from '../components/Brand/Chip';
import BrandCreation from '../components/Modal/Brand/AddBrand';
import BrandView from '../components/Modal/Brand/BrandView';
import BrandUpdate from '../components/Modal/Brand/UpdateBrand';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Brand } from '../interface/brand/brand';
import { useAppSelector } from '../redux/hooks';

const Brands = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const getBrandsList = useQuery(['brands', page, pageSize], () =>
    fetchBrands(logReducer.accessToken, page, pageSize),
  );
  const { data, isLoading, isError, isRefetching } = getBrandsList;

  const { mutate } = useMutation(deleteBrand, {
    onSuccess: () => {
      toast.success('Marque supprimé');
      getBrandsList.refetch();
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
                            <BrandView brand={brand.brand} />
                          </CustomDialog>
                        </Stack>
                      </TableCell>
                      <TableCell align='center'>
                        <Stack
                          direction={'row'}
                          spacing={2}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          <Button
                            variant={'outlined'}
                            onClick={() =>
                              mutate({
                                token: logReducer.accessToken,
                                brand: brand.brand,
                              })
                            }
                          >
                            Remove
                          </Button>
                          <CustomDialog
                            header={'Brand update'}
                            trigger={
                              <Button variant={'outlined'}>Update</Button>
                            }
                          >
                            <BrandUpdate
                              brand={brand.brand}
                              url={brand.photo}
                            />
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
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Brands;
