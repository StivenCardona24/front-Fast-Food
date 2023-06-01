import axios from "axios";

interface CrudOptions {
  resource: string;
  errorGetAll?: (error: any) => void;
  errorGetOne?: (error: any) => void;
  errorCrete?: (error:any) => void;
  errorUpdate?: (error: any) => void;
  errorDelete?: (error: any) => void;
}
export const createCrud = (options: CrudOptions) => {
  const api = axios.create({
    baseURL: `http://localhost:3309/v1/${options.resource}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

 
  const getAll = async ( data?: any) => {

  
    try {
      if(data){
        
        const response = await api.get("/", { params: data});
        return response.data;
      }
        const response = await api.get('');
      
      return response.data;
    } catch (error) {
      options.errorGetAll?.(error);
      return error;
    }
  };

  const getOne = async (id: number) => {

    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      options.errorGetOne?.(error);
      return error;
    }
  };

  const create = async (data: any,) => {
 
    try {
      const response = await api.post("", data);
      return response.data;
    } catch (error) {
      options.errorCrete?.(error);
      return error;
    }
  };

  const update = async (id: number, data: any) => {

    try {
      const response = await api.put(`/${id}`, );
      return response.data;
    } catch (error) {
      options.errorUpdate?.(error);
      return error;
    }
  };

  const deleteOne = async (id: number) => {
    try {
      const response = await api.delete(`/${id}`, );
      return response.data;
    } catch (error) {
      options.errorDelete?.(error);
      return error;
    }
  };

 

  return { getAll, getOne, create, update, deleteOne };
};
