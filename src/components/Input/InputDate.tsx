import { FormControl, FormHelperText, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ConnectedForm } from '../ConnectedForm';
import React from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  property: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const InputDate: React.FC<Props> = ({
  property,
  label,
  required = false,
  fullWidth = false,
}) => {
  return (
    <ConnectedForm>
      {({ control }) => (
        <Controller
          control={control}
          name={property}
          rules={{ required: { value: required, message: 'This is required' } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl fullWidth>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label={label}
                  renderInput={(params) => <TextField {...params} />}
                  value={value}
                  onChange={onChange}
                />
              </LocalizationProvider>
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </FormControl>
          )}
        ></Controller>
      )}
    </ConnectedForm>
  );
};
