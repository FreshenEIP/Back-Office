import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { createNews } from '../../../api/news';
import { useAppSelector } from '../../../redux/hooks';
import { News } from './News';

interface FormValues {
  title: string;
  image: string;
  text: string;
}

const NewsCreation = () => {
  //@ts-ignore
  const logReducer = useAppSelector((state) => state.logReducer);
  const defaultValues = {
    title: '',
    image: '',
    text: '',
  };

  const methods = useForm<FormValues>({ defaultValues });

  const { mutate } = useMutation(createNews, {
    onSuccess: (res) => {
      toast.success('News created');
    },
    onError: () => {
      toast.error('Error while creating brand');
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (payload) => {
    dayjs.extend(utc);
    const token = logReducer.accessToken;
    mutate({ payload, token });
  };

  return (
    <FormProvider {...methods}>
      <News onSubmit={onSubmit} />
    </FormProvider>
  );
};

export default NewsCreation;
