import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { ConnectedForm } from '../ConnectedForm';
import React from 'react';

interface Props {
  property: string;
  label: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const InputBoolean: React.FC<Props> = ({
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
            <FormControl fullWidth={fullWidth} margin='dense'>
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={onChange}
                    aria-describedby={`${property}-error-text`}
                  />
                }
                label={label}
                sx={{ textTransform: 'capitalize' }}
              />
              {error && (
                <FormHelperText error id={`${property}-error-text`}>
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
