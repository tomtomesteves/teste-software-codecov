import axios, { AxiosInstance } from 'axios'

type Params = {
  params?: Record<string, any>
}

type Hook = (params?: Params) => AxiosInstance

const useAPI: Hook = (params) => {
  const baseURL = 'http://localhost:5000/'

  const instance = axios.create({
    baseURL,
    params: {
      ...params,
    },
  })
  return instance
}

export default useAPI
