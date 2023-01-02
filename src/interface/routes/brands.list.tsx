import { Brand } from '../brand/brand';

export interface BrandsList {
  count: number;
  page: number;
  pageSize: number;
  data: Array<Brand>;
}
