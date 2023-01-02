import { Report } from '../report/report';

export interface ReportList {
  count: number;
  page: number;
  pageSize: number;
  data: Array<Report>;
}
