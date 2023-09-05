import { Box, Divider, IconButton, Stack } from '@mui/material';
import { FaCottonBureau, FaDollarSign, FaWater } from 'react-icons/fa';
import { RiAddCircleLine, RiDeleteBin2Line } from 'react-icons/ri';

const BrandView = (articles) => {
  return (
    <>
      <Stack direction={'row'} width='100%' justifyContent={'right'}>
        <IconButton type='button'>
          <RiAddCircleLine />
        </IconButton>
      </Stack>
      <Divider variant='middle' role='presentation' sx={{ margin: '10px' }} />
      <Stack width={'100%'} spacing={2}>
        {Object.keys(articles.articles).map((value, idx) => {
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
                  <Box>{articles.articles[value].cost} €</Box>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Box>
                    <FaWater />
                  </Box>
                  <Box>{articles.articles[value].water} L</Box>
                </Stack>
                <Stack direction={'row'} spacing={2}>
                  <Box>
                    <FaCottonBureau />
                  </Box>
                  <Box>{articles.articles[value].coton} Kg</Box>
                </Stack>
              </Stack>
              <IconButton type='button' onClick={() => {}}>
                <RiDeleteBin2Line />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

export default BrandView;
