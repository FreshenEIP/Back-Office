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
}
