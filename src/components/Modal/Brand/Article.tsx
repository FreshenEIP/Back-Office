import styled from '@emotion/styled';
import { Box, Button, Stack } from '@mui/material';
import { ConnectedForm } from '../../ConnectedForm';
import { InputString } from '../../Input/InputString';
import { InputNumber } from '../../Input/inputNumber';

interface Props {
  onSubmit: (payload: any) => void;
  isUpdate?: boolean;
}

export const Article: React.FC<Props> = ({ onSubmit, isUpdate = false }) => {
  return (
    <ConnectedForm>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack width='100%' spacing={2}>
            <Stack direction={'row'} width='100%' spacing={2}>
              <Box width={'100%'}>
                <InputString
                  fullWidth
                  required
                  property={`name`}
                  label={'Name'}
                />
              </Box>
            </Stack>
            <Stack direction={'row'} width='100%' spacing={2}>
              <Box width={'100%'}>
                <InputNumber
                  fullWidth
                  required
                  property={`cost`}
                  label={'Price (€)'}
                />
              </Box>
              <Box width={'100%'}>
                <InputNumber
                  fullWidth
                  required
                  property={`water`}
                  label={'Water (L)'}
                />
              </Box>
              <Box width={'100%'}>
                <InputNumber
                  fullWidth
                  required
                  property={`coton`}
                  label={'Cotton (Kg)'}
                />
              </Box>
            </Stack>
          </Stack>
          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{ margin: '1rem 0rem' }}
          >
            {isUpdate ? 'Update' : 'Create'}
          </Button>
        </Form>
      )}
    </ConnectedForm>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
`;
