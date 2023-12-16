import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createArticle } from '../../../api/brands';
import { useAppSelector } from '../../../redux/hooks';
import { Article } from './Article';

interface FormValues {
  name: string;
  cost: string;
  water: string;
  coton: string;
}

const ArticleCreation = ({ brand }) => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const defaultValues = {
    name: '',
    cost: '0',
    water: '0',
    coton: '0',
  };

  const methods = useForm<FormValues>({ defaultValues });

  const { mutate } = useMutation(createArticle, {
    onSuccess: (res) => {
      toast.success('Article created');
    },
    onError: () => {
      toast.error('Error while creating article');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    const token = logReducer.accessToken;
    const object = {
      name: payload.name,
      cost: parseFloat(payload.cost),
      water: parseFloat(payload.water),
      coton: parseFloat(payload.coton),
    };
    mutate({ brand, payload: object, token });
  };

  return (
    <FormProvider {...methods}>
      <Article onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ArticleCreation;
