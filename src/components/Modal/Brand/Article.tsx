import styled from '@emotion/styled';
import { Box, Button, MenuItem, Stack } from '@mui/material';
import React from 'react';
import { ConnectedForm } from '../../ConnectedForm';
import { InputSimpleSelect } from '../../Input/InputSimpleSelect';
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
                <InputSimpleSelect
                  fullWidth
                  required
                  property={`name`}
                  label={'Name'}
                >
                  <MenuItem value='cap'>Cap</MenuItem>
                  <MenuItem value='hoodie'>Hoodie</MenuItem>
                  <MenuItem value='jean'>Jean</MenuItem>
                  <MenuItem value='polo'>Polo</MenuItem>
                  <MenuItem value='shirt'>Shirt</MenuItem>
                  <MenuItem value='short'>Short</MenuItem>
                </InputSimpleSelect>
              </Box>
            </Stack>
            <Stack direction={'row'} width='100%' spacing={2}>
              <Box width={'100%'}>
                <InputNumber
                  min={0}
                  fullWidth
                  required
                  property={`cost`}
                  label={'Price (€)'}
                />
              </Box>
              <Box width={'100%'}>
                <InputNumber
                  min={0}
                  fullWidth
                  required
                  property={`water`}
                  label={'Water (L)'}
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
