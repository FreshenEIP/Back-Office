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
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from 'react-query';
import { deleteBrand } from '../api/brands';
import { Chip as BrandChip } from '../components/Brand/Chip';
import BrandCreation from '../components/Modal/Brand/AddBrand';
import BrandView from '../components/Modal/Brand/BrandView';
import BrandUpdate from '../components/Modal/Brand/UpdateBrand';
import { CustomDialog } from '../components/Modal/CustomDialog';
import { Brand } from '../interface/brand/brand';
import { useFetchBrands } from '../query/Brands';
import { useAppSelector } from '../redux/hooks';

const Brands = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  // const [page, setPage] = useState(0);
  // const [pageSize, setPageSize] = useState(25);
  const getBrandsList = useFetchBrands(logReducer.accessToken);
  const { data, isLoading, isError, isRefetching } = getBrandsList;

  const { mutate } = useMutation(deleteBrand, {
    onSuccess: () => {
      toast.success('Marque supprimé');
      getBrandsList.refetch();
    },
    onError: () => {
      toast.error('Error while deleting news');
    },
  });

  const handleConfirmation = (brand) => {
    const token = logReducer.accessToken;
    mutate({ token, brand });
  };

  if (isError) return <div data-testid='brands-error'>Error...</div>;

  if (isLoading || isRefetching)
    return <div data-testid='brands-loading'>Loading...</div>;

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
              {data.map((brand: Brand, idx: number) => {
                return (
                  <TableRow data-testid='brands-rows' key={brand._id}>
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
                        <CustomDialog
                          header={'Brand update'}
                          trigger={<Button variant={'outlined'}>Update</Button>}
                        >
                          <BrandUpdate brand={brand.brand} url={brand.photo} />
                        </CustomDialog>
                        <CustomDialog
                          header={'Supprimer marque'}
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
                                Êtes-vous sure de vouloir supprimer cet marque ?
                              </Typography>
                              <Typography>{brand.brand}</Typography>
                              <Button
                                variant={'outlined'}
                                color='error'
                                onClick={() => handleConfirmation(brand.brand)}
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
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

const Toolbar = styled(Stack)`
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 1rem;
`;

export default Brands;
