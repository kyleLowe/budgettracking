/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, createContext, type ReactNode } from "react";
import axios, { type AxiosResponse } from "axios";

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "";

interface HTTPMethods {
  get: (url: string) => Promise<AxiosResponse<any> | null>;
  post: (url: string, request: any) => Promise<AxiosResponse<any> | null>;
  put: (url: string, request: any) => Promise<AxiosResponse<any> | null>;
  patch: (url: string, request: any) => Promise<AxiosResponse<any> | null>;
  del: (url: string) => Promise<AxiosResponse<any> | null>;
  error: string | null;
}

const HTTPContext = createContext({} as HTTPMethods);

interface HTTPProviderProps {
  children: ReactNode;
}

function HTTPProvider({ children }: HTTPProviderProps) {
  const [error, setError] = useState<string | null>(null);

  const api = axios.create({
    withCredentials: true,
  });

  async function get(url: string): Promise<AxiosResponse<any> | null> {
    try {
      const response = await api.get(`${API_BASE_URL}/${url}`);
      setError(null);
      return response;
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      return null;
    }
  }

  async function post(
    url: string,
    request: any,
  ): Promise<AxiosResponse<any> | null> {
    try {
      const response = await api.post(`${API_BASE_URL}/${url}`, request);
      setError(null);
      return response;
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      return null;
    }
  }

  async function put(
    url: string,
    request: any,
  ): Promise<AxiosResponse<any> | null> {
    try {
      const response = await api.put(`${API_BASE_URL}/${url}`, request);
      setError(null);
      return response;
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      return null;
    }
  }

  async function del(url: string): Promise<AxiosResponse<any> | null> {
    try {
      const response = await api.delete(`${API_BASE_URL}/${url}`);
      setError(null);
      return response;
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      return null;
    }
  }

  async function patch(
    url: string,
    request: any,
  ): Promise<AxiosResponse<any> | null> {
    try {
      const response = await api.patch(`${API_BASE_URL}/${url}`, request);
      setError(null);
      return response;
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
      return null;
    }
  }

  // Context value
  const contextValue: HTTPMethods = {
    get,
    post,
    put,
    patch,
    del,
    error,
  };

  // Return the provider with children
  return (
    <HTTPContext.Provider value={contextValue}>{children}</HTTPContext.Provider>
  );
}

export { HTTPContext, HTTPProvider };
