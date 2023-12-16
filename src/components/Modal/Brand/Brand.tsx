import styled from '@emotion/styled';
import { Box, Button, IconButton, Popover, Stack } from '@mui/material';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { RiImage2Fill } from 'react-icons/ri';
import { ConnectedForm } from '../../ConnectedForm';
import { Image } from '../../Image';
import { InputString } from '../../Input/InputString';
import React from 'react';

interface Props {
  onSubmit: (payload: any) => void;
  isUpdate?: boolean;
}

export const Brand: React.FC<Props> = ({ onSubmit, isUpdate = false }) => {
  const [anchor, setAnchor] = useState(null);
  const { watch } = useFormContext();

  const handleClickImage = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <ConnectedForm>
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Stack direction={'row'} width={'100%'} spacing={2}>
            <Box width={'40%'}>
              <InputString
                property={'brand'}
                label={'Name'}
                disable={isUpdate ? true : false}
                required
                fullWidth
              />
            </Box>
            <Box width={'60%'}>
              <InputString
                property={'url'}
                label={'Logo'}
                pattern={
                  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/
                }
                endAdornment={
                  <>
                    <IconButton
                      aria-describedby={'image-popover'}
                      onClick={handleClickImage}
                    >
                      <RiImage2Fill />
                    </IconButton>
                    <Popover
                      id={'image-popover'}
                      open={Boolean(anchor)}
                      anchorEl={anchor}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                      }}
                    >
                      <Image src={watch('url')} alt={'item image'} />
                    </Popover>
                  </>
                }
                fullWidth
                required
              />
            </Box>
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
