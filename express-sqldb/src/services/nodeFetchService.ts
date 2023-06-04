import { BodyInit, RequestInit } from 'node-fetch';
import { ApiError } from '../types/apiErrorType';
const fetch = require('node-fetch-npm');

class NodeFetchService {
    baseUrl: string;
  
    constructor(url: string) {
      this.baseUrl = url;
    }
  
    fetch = async <T>(
      url: string,
      body?: BodyInit,
      args?: Record<string, string>,
      requestInit?: RequestInit
    ): Promise<T | null | any> => {
      try {
        const urlObj = new URL(url, this.baseUrl);
  
        if (args) {
          urlObj.search = new URLSearchParams(args).toString();
        }
  
        const requestOptions = { ...requestInit, body };

        const response = await fetch(urlObj.toString(), requestOptions);
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new ApiError(400, errorMessage);
        }
  
        if (response.status === 204) {
          return;
        }
  
        return response.json();
      } catch (e: any) {
        throw new ApiError(500, e.message);
      }
    };
  
    get = <T>(
      url: string,
      args?: Record<string, any>,
      requestInit?: RequestInit
    ): Promise<T> =>
      this.fetch(url, undefined, args, { ...requestInit, method: 'GET' });
  
    post = <T>(
      url: string,
      body?: Record<string, any>,
      args?: Record<string, any>,
      requestInit?: RequestInit
    ): Promise<T> => {
      const bodyString = body ? JSON.stringify(body) : undefined;
  
      return this.fetch(url, bodyString, args, {
        ...requestInit,
        method: 'POST',
      });
    };
  }
  
  export default NodeFetchService;