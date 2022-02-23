import axios from "axios";
import { useQuery } from "react-query";

async function fetchAssets(limit: number, page?: number) {
  const { data } = await axios.get(
    `https://data.messari.io/api/v2/assets?fields=symbol,id,name,metrics/market_data/price_usd${
      page ? `&page=${page}` : ""
    }${limit ? `&limit=${limit}` : ""}`
  );
  return data;
}

const useAssets = (page?: number, limit: number = 500) => {
  const { data, isLoading } = useQuery(
    (page && ["assets", page, limit]) || ["assets", limit],
    () => fetchAssets(limit, page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  return { data, isLoading };
};

export default useAssets;
