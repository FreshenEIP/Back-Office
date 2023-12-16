import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { updateBrand } from '../../../api/brands';
import { useAppSelector } from '../../../redux/hooks';
import { Brand } from './Brand';
import React from 'react';

interface FormValues {
  brand: string;
  url: string;
}

const BrandUpdate = ({ brand, url }) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const defaultValues = {
    brand: brand,
    url: url,
  };

  const methods = useForm<FormValues>({ defaultValues });

  const { mutate } = useMutation(updateBrand, {
    onSuccess: (res) => {
      toast.success('Brand updated');
    },
    onError: () => {
      toast.error('Error while updating brand');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    dayjs.extend(utc);
    const token = logReducer.accessToken;
    mutate({ payload, token });
  };

  return (
    <FormProvider {...methods}>
      <Brand onSubmit={onSubmit} isUpdate={true} />
    </FormProvider>
  );
};

export default BrandUpdate;
