import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  Select,
} from '@mui/material';
import { ConnectedForm } from '../ConnectedForm';
import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  property: string;
  label: string;
  children: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  required?: boolean;
  fullWidth?: boolean;
}

export const InputSimpleSelect: React.FC<Props> = ({
  property,
  label,
  children,
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
                required
                sx={{ textTransform: 'capitalize' }}
              >
                {label}
              </InputLabel>
              <Select
                labelId={property}
                id={property}
                label={label}
                value={value}
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
                sx={{ textTransform: 'capitalize' }}
                onChange={onChange}
                error={!!error}
                aria-describedby={`${property}-error-text`}
              >
                {children}
              </Select>
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
