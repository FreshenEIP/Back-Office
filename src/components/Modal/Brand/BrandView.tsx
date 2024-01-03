import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaDollarSign, FaWater } from 'react-icons/fa';
import {
  RiAddCircleLine,
  RiArrowLeftSLine,
  RiDeleteBin2Line,
} from 'react-icons/ri';
import { useMutation, useQuery } from 'react-query';
import { deleteArticle, fetchBrand } from '../../../api/brands';
import { useAppSelector } from '../../../redux/hooks';
import ArticleCreation from './AddArticle';

const BrandView = ({ brand }) => {
  const [view, setView] = useState('brand');
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);

  const getBrand = useQuery([`brand ${brand}`], () =>
    fetchBrand(logReducer.accessToken, brand),
  );
  const { data, isLoading, isError, isRefetching } = getBrand;

  const { mutate } = useMutation(deleteArticle, {
    onSuccess: () => {
      toast.success('Article supprimé');
      getBrand.refetch();
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'article");
    },
  });

  const handleReturn = () => {
    setView('brand');
    getBrand.refetch();
  };

  if (isError) return <div>Error ...</div>;

  if (view === 'brand')
    return (
      <>
        <Stack direction={'row'} width='100%' justifyContent={'right'}>
          <IconButton type='button' onClick={() => setView('article')}>
            <RiAddCircleLine />
          </IconButton>
        </Stack>
        <Divider variant='middle' role='presentation' sx={{ margin: '10px' }} />
        <Stack width={'100%'} spacing={2}>
          {isLoading || isRefetching ? (
            <></>
          ) : (
            Object.keys(data.articles).map((value, idx) => {
              return (
                <Stack
                  direction={'row'}
                  width={'100%'}
                  useFlexGap
                  key={idx}
                  alignItems={'center'}
                >
                  <Box width={'100%'}>{value}</Box>
                  <Stack width={'100%'} spacing={1}>
                    <Stack direction={'row'} spacing={2}>
                      <Box>
                        <FaDollarSign />
                      </Box>
                      <Box>{data.articles[value].cost} €</Box>
                    </Stack>
                    <Stack direction={'row'} spacing={2}>
                      <Box>
                        <FaWater />
                      </Box>
                      <Box>{data.articles[value].water} L</Box>
                    </Stack>
                  </Stack>
                  <IconButton
                    type='button'
                    onClick={() =>
                      mutate({
                        token: logReducer.accessToken,
                        brand,
                        article: value,
                      })
                    }
                  >
                    <RiDeleteBin2Line />
                  </IconButton>
                </Stack>
              );
            })
          )}
        </Stack>
      </>
    );
  else
    return (
      <>
        <Stack direction={'row'} width='100%' justifyContent={'left'}>
          <IconButton type='button' onClick={handleReturn}>
            <RiArrowLeftSLine />
            <Typography>Retour</Typography>
          </IconButton>
        </Stack>
        <ArticleCreation brand={brand} />
      </>
    );
};

export default BrandView;
