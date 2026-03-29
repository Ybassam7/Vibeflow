import apiClient from "../services/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useVibeFetch(queryKey, endPoint, options = {}) {
  const getData = async () => {
    const { data } = await apiClient.get(`/${endPoint}`)
    return data;
  };

  const query = useQuery({
    queryKey: queryKey,
    queryFn: getData,
    ...options,

    staleTime: options.staleTime || 5 * 60 * 1000,
    retry: options.retry !== undefined ? options.retry : false,
  });

  return query;
}
