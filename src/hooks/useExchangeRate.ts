import { useQuery } from "react-query";
import axios from "axios";

async function fetchExchangeRate(from: string, amount: number) {
  const { data } = await axios.get(
    `https://api.exchangerate.host/convert?from=${from}&to=USD&amount=${amount}`
  );
  return data.result;
}

const useExchangeRate = (from: string, amount: number) => {
  const { data, isLoading } = useQuery(["exchangeRage", from, amount], () =>
    fetchExchangeRate(from, amount)
  );

  return { data, isLoading };
};

export default useExchangeRate;
