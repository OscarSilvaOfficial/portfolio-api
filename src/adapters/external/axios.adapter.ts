import { RequestPort } from 'src/ports/request.port';
import axios, { AxiosStatic } from 'axios';

class AxiosAdapter implements RequestPort {
  private axios: AxiosStatic;
  private headers: any;

  constructor(headers = {}) {
    this.axios = axios;
    this.headers = headers;
  }

  async get(url: string): Promise<any> {
    return await this.axios.get(url, { headers: this.headers });
  }

  async post(url: string, data: any): Promise<any> {
    return await this.axios.post(url, data, { headers: this.headers });
  }

  async put(url: string, data: any): Promise<any> {
    return await this.axios.put(url, data, { headers: this.headers });
  }

  async patch(url: string, data: any): Promise<any> {
    return await this.axios.patch(url, data, { headers: this.headers });
  }

  async delete(url: string): Promise<any> {
    return await this.axios.delete(url, { headers: this.headers });
  }

  set setHeaders(headers: any) {
    this.headers = headers;
  }
}

export { AxiosAdapter };
