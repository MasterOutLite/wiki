import axios, {AxiosRequestConfig} from 'axios';

import {API_URL} from 'src/constants';

console.log(API_URL);

type Request = {
  url: string;
  method?: string;
  data?: object;
  status?: number;
};

function api<T>(request: Request) {
  const sendRequest: AxiosRequestConfig = {
    ...request,
    baseURL: API_URL,
    method: request.method || 'GET',
    responseType: 'json',
    headers: {
      ...(localStorage.getItem('token') ? {Authorization: `Bearer ${localStorage.getItem('token')}`} : {}),
    },
  };

  return axios<T>(sendRequest)
    .then(response => {
      if (request.status && response.status !== request.status) {
        throw new Error('Wrong status');
      }

      return response;
    })
    .catch(e => {
      console.log(e);
    });
}

export default api;
