import { ReportList } from '../interface/routes/reports.list';
import Axios from '../utils/axios';

export const fetchReports = async (
  token: string,
  page: number,
  pageSize: number,
  status?: string,
): Promise<ReportList> => {
  status = status === '' ? undefined : status;
  const response = await Axios.get('v2/report', token, {
    page,
    page_size: pageSize,
    status,
  });
  return response.data;
};
