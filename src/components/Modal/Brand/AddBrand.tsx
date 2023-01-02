import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Brand } from './Brand';

interface FormValues {
  name: string;
  logo: string;
  articles: Array<{
    name: string;
    price: number;
  }>;
}

const BrandCreation = () => {
  const defaultValues = {
    name: '',
    logo: '',
    articles: [],
  };

  const methods = useForm<FormValues>({ defaultValues });

  // const { mutate } = useMutation(insertFunctionHere, {
  //   onSuccess: (res) => {
  //     toast.success('Brand created');
  //   },
  //   onError: () => {
  //     toast.error('Error while creating brand');
  //   },
  // });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    dayjs.extend(utc);
    // mutate({ payload, token });
  };

  return (
    <FormProvider {...methods}>
      <Brand onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default BrandCreation;
