const BASE_URL = import.meta.env.VITE_BASE_URL;
import axios, { AxiosResponse } from "axios";

//get all 
async function getAll(endpoint: string): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(BASE_URL + endpoint);
    return response.data;
  } catch (error) {
    return error; 
  }
}

//get one  
async function getOne(endpoint: string, id: string | number): Promise<any> {
  try {
    const response: AxiosResponse = await axios.get(BASE_URL + endpoint + `/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

//post
async function post(endpoint: string, payload: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.post(BASE_URL + endpoint, payload);
    return response.data;
  } catch (error) {
    return error;
  }
}

//delete
async function deleteOne(endpoint: string, id: string | number): Promise<any> {
  try {
    const response: AxiosResponse = await axios.delete(BASE_URL + endpoint + `/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

//put
async function put(endpoint: string, id: string | number, payload: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.put(BASE_URL + endpoint + `/${id}`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
}

//patch
async function patch(endpoint: string, id: string | number, payload: any): Promise<any> {
  try {
    const response: AxiosResponse = await axios.patch(BASE_URL + endpoint + `/${id}`, payload);
    return response.data;
  } catch (error) {
    return error;
  }
}

const requestsController = {
  post,
  getAll,
  getOne,
  deleteOne,
  put,
  patch,
};

export default requestsController;
