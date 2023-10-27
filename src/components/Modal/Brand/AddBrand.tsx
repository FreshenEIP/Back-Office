import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createBrand } from '../../../api/brands';
import config from '../../../config';
import { Brand } from './Brand';

interface FormValues {
  brand: string;
  url: string;
}

const BrandCreation = () => {
  const defaultValues = {
    brand: '',
    url: '',
  };

  const methods = useForm<FormValues>({ defaultValues });

  const { mutate } = useMutation(createBrand, {
    onSuccess: (res) => {
      toast.success('Brand created');
    },
    onError: () => {
      toast.error('Error while creating brand');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    dayjs.extend(utc);
    const token = config.TOKEN;
    mutate({ payload, token });
  };

  return (
    <FormProvider {...methods}>
      <Brand onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default BrandCreation;
