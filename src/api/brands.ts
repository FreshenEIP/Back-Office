import Axios from '../utils/axios';

export const fetchBrands = async (
  token: string,
  page: number,
  pageSize: number,
): Promise<any> => {
  const response = await Axios.get('v2/gestion_article/brand', token, {
    page,
    pageSize,
  });
  return response.data;
};

export const fetchBrand = async (
  token: string,
  brand: string,
): Promise<any> => {
  const response = await Axios.get(`v2/gestion_article/brand/${brand}`, token);
  return response.data;
};

export const createBrand = async (data): Promise<any> => {
  const { payload, token } = data;
  const response = await Axios.post('v2/gestion_article/brand', token, payload);
  return response.data;
};

export const updateBrand = async (data): Promise<any> => {
  const { payload, token } = data;
  const response = await Axios.patch(
    `v2/gestion_article/${payload.brand}/photo`,
    token,
    { photo: payload.url },
  );
  return response.data;
};

export const createArticle = async (data): Promise<any> => {
  const { brand, payload, token } = data;
  const response = await Axios.post(
    `v2/gestion_article/${brand}/${payload.name}`,
    token,
    payload,
  );
  return response.data;
};

export const deleteArticle = async (data: {
  token: string;
  brand;
  article;
}) => {
  const { token, brand, article } = data;
  const response = await Axios.delete(
    `v2/gestion_article/${brand}/${article}`,
    token,
  );
  return response.data;
};

export const deleteBrand = async (data: { token: string; brand }) => {
  const { token, brand } = data;
  const response = await Axios.delete(
    `v2/gestion_article/brand/${brand}`,
    token,
  );
  return response.data;
};
