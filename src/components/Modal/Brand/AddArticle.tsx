import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createArticle } from '../../../api/brands';
import config from '../../../config';
import { Article } from './Article';

interface FormValues {
  name: string;
  cost: number;
  water: number;
  coton: number;
}

const ArticleCreation = ({ brand }) => {
  const defaultValues = {
    name: '',
    cost: 0,
    water: 0,
    coton: 0,
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
    const token = config.TOKEN;
    mutate({ brand, payload, token });
  };

  return (
    <FormProvider {...methods}>
      <Article onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default ArticleCreation;
