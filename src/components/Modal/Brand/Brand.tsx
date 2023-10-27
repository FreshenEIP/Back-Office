import styled from '@emotion/styled';
import {
  Box,
  Button,
  IconButton,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import {
  RiAddCircleLine,
  RiDeleteBin2Line,
  RiImage2Fill,
} from 'react-icons/ri';
import { ConnectedForm } from '../../ConnectedForm';
import { Image } from '../../Image';
import { InputString } from '../../Input/InputString';
import { InputNumber } from '../../Input/inputNumber';

interface Props {
  onSubmit: (payload: any) => void;
  isUpdate?: boolean;
}

const Articles = ({ property, required = false, fullWidth = false }) => {
  const { fields, append, remove } = useFieldArray({
    name: property, // unique name for your Field Array
  });

  return (
    <>
      <ConnectedForm>
        {() => (
          <>
            <Stack
              direction={'row'}
              width='100%'
              justifyContent={'space-between'}
            >
              <Typography variant='h6'>Articles</Typography>
              <IconButton
                type='button'
                onClick={() =>
                  append({
                    name: '',
                    price: '',
                  })
                }
              >
                <RiAddCircleLine />
              </IconButton>
            </Stack>
            {fields.map((f, index) => (
              <Stack direction={'row'} key={f.id} width='100%'>
                <Stack direction={'row'} width='100%' spacing={2}>
                  <Box width={'100%'}>
                    <InputString
                      fullWidth={fullWidth}
                      required={required}
                      property={`${property}.${index}.name`}
                      label={'Name'}
                    />
                  </Box>
                  <Box width={'100%'}>
                    <InputNumber
                      fullWidth={fullWidth}
                      required={required}
                      property={`${property}.${index}.price`}
                      label={'Price'}
                    />
                  </Box>
                </Stack>
                <IconButton type='button' onClick={() => remove(index)}>
                  <RiDeleteBin2Line />
                </IconButton>
              </Stack>
            ))}
          </>
        )}
      </ConnectedForm>
    </>
  );
};

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
          {/* <Articles property={'articles'} fullWidth /> */}
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
