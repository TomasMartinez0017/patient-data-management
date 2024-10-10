import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiService {
  get<T>(url: string, params?: AxiosRequestConfig): Promise<AxiosResponse<T>>;
  // Other methods
}

const apiService: ApiService = {
  async get<T>(
    url: string,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return axios.get<T>(url, {
      ...params,
    });
  },
};

export { apiService };
