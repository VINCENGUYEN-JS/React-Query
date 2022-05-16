import { useState } from "react";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import Sorting from "../components/Sorting";
import { useMyContext } from "../context/store";
import { useInfiniteQuery } from "react-query";
import { getInfiniteData } from "../api/productAPI";

const Search = () => {
  const { value } = useParams();
  const { sort } = useMyContext();

  const [limit, setLimit] = useState(2);

  const key = `/products?search=${value}&sort=${sort}&limit=${limit}`;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(key, getInfiniteData, {
    getNextPageParam: (lastPage, pages) => {
      // console.log({lastPage, pages})
      const { products } = lastPage;
      if (products.length >= limit) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  // console.log({hasNextPage, isFetchingNextPage, isFetching})

  return (
    <>
      <Sorting />

      <div className="products">
        {data?.pages.map((page, index) => (
          <Products key={index} products={page.products} />
        ))}
      </div>

      {isFetching && <p style={{ textAlign: "center" }}>Loading...</p>}

      {error && <p style={{ textAlign: "center" }}>{error}</p>}

      <button
        className="btn-load_more"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        Load more
      </button>
    </>
  );
};

export default Search;
