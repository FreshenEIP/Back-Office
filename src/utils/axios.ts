import axios from 'axios';
import config from '../config';

export default class Axios {
  static baseURL: string = config.API_URL;

  static request(path: string) {
    const url = new URL(this.baseURL);
    url.pathname = path;
    return url.toString();
  }

  static async get(route: string, token = '', params?: any) {
    return axios.get(Axios.request(route), {
      headers: { Authorization: token },
      params,
      baseURL: this.baseURL,
      timeout: 20000,
    });
  }

  static async post(
    route: string,
    token = '',
    payload: any,
    params: object = {},
  ) {
    return axios.post(Axios.request(route), payload, {
      headers: { Authorization: token },
      params,
      baseURL: this.baseURL,
      timeout: 20000,
    });
  }

  static async delete(route: string, token = '', params: object = {}) {
    return axios.delete(Axios.request(route), {
      headers: { Authorization: token },
      params,
      baseURL: this.baseURL,
      timeout: 20000,
    });
  }

  static async patch(
    route: string,
    token = '',
    payload: any,
    params: object = {},
  ) {
    return axios.patch(Axios.request(route), payload, {
      headers: { Authorization: token },
      params,
      baseURL: this.baseURL,
      timeout: 20000,
    });
  }
}
