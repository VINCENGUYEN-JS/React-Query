import { useState, useEffect, useMemo } from "react";

import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import { useQuery } from "react-query";
import { getData } from "./../api/productAPI";

const Home = () => {
  const [limit, setLimit] = useState(5);

  const { page, sort, refetching } = useMyContext();

  console.log({ page, sort });

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;

  const { data, isLoading, error } = useQuery({
    queryKey: key,
    queryFn: getData,
    retry: false,
    keepPreviousData: true,
    staleTime: 15000,
  });

  const totalPages = useMemo(() => {
    if (!data?.count) return 0;
    return Math.ceil(data.count / limit);
  }, [data?.count, limit]);

  return (
    <main>
      <Sorting page={page} />
      {data && <Products products={data.products} />}
      {isLoading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center" }}>{error.message}</p>}
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default Home;
