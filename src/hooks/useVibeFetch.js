import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useVibeFetch(queryKey, endPoint, options = {}) {
  const getData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
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
