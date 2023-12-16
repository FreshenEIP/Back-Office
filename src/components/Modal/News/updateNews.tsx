import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { updateNews } from '../../../api/news';
import { useAppSelector } from '../../../redux/hooks';
import { News } from './News';
import React from 'react';

interface FormValues {
  title: string;
  image: string;
  text: string;
}

const NewsUpdate = ({ title, image, text, date, id }) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const defaultValues = {
    title: title,
    image: image,
    text: text,
  };

  const methods = useForm<FormValues>({ defaultValues });

  const { mutate } = useMutation(updateNews, {
    onSuccess: (res) => {
      toast.success('News updated');
    },
    onError: () => {
      toast.error('Error while updating news');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    dayjs.extend(utc);
    const token = logReducer.accessToken;
    payload['date'] = date;
    mutate({ payload, id, token });
  };

  return (
    <FormProvider {...methods}>
      <News onSubmit={onSubmit} isUpdate />
    </FormProvider>
  );
};

export default NewsUpdate;
