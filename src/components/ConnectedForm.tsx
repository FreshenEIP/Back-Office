import { useFormContext } from 'react-hook-form';

export const ConnectedForm = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};
