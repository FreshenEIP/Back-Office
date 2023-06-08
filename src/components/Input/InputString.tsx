import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';
import { ConnectedForm } from '../ConnectedForm';

interface Props {
  property: string;
  label: string;
  pattern?: RegExp;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  required?: boolean;
  multiline?: boolean;
  fullWidth?: boolean;
}

export const InputString: React.FC<Props> = ({
  property,
  label,
  pattern = /^(?!\s*$).+/,
  endAdornment = null,
  startAdornment = null,
  required = false,
  multiline = false,
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
            pattern: { value: pattern, message: 'The pattern does not match' },
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
                id={property}
                label={label}
                multiline={multiline}
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
                aria-describedby={`${property}-error-text`}
                onChange={onChange}
                value={value}
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
