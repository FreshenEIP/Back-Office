import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { ConnectedForm } from '../ConnectedForm';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import React from 'react';

interface Props {
  property: string;
  label: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

export const InputNumber: React.FC<Props> = ({
  property,
  label,
  startAdornment = null,
  endAdornment = null,
  required = false,
  fullWidth = false,
}) => {
  return (
    <ConnectedForm>
      {({ control }) => (
        <Controller
          name={property}
          control={control}
          rules={{
            required: { value: required, message: 'This is required' },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <FormControl fullWidth={fullWidth} margin='dense'>
              <InputLabel
                htmlFor={property}
                required={required}
                sx={{ textTransform: 'capitalize' }}
              >
                {label}
              </InputLabel>
              <OutlinedInput
                type='number'
                id={property}
                label={label}
                startAdornment={
                  <InputAdornment position={'start'}>
                    {startAdornment}
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position={'end'}>
                    {endAdornment}
                  </InputAdornment>
                }
                value={value}
                onChange={onChange}
                aria-describedby={`${property}-error-text`}
                error={!!error}
              />
              {error && (
                <FormHelperText id={`${property}-error-text`} error>
                  {error.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />
      )}
    </ConnectedForm>
  );
};
