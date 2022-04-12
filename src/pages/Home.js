import { useState, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import Pagination from '../components/Pagination'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import { getData } from '../api/productAPI'

const Home = () => {
  const [limit, setLimit] = useState(5)
  const { page, sort, refetching } = useMyContext()

  const queryClient = useQueryClient()

  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
  const key1 = `/products?limit=${limit}&page=${page + 1}&sort=${sort}`;

  queryClient.setQueryData('keys', {k1: key, k2: ''})

  useEffect(async () => {
    // The results of this query will be cached like a normal query
    await queryClient.prefetchQuery(key1, getData)
  }, [key1])


  const {
    data, isFetching, error, refetch, isPreviousData
  } = useQuery({
    queryKey: key,
    queryFn: getData,
    keepPreviousData: true,
  })

  const totalPages = useMemo(() => {
    if(!data?.count) return 0;
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])

  // useEffect(() => {
  //   refetch()
  // }, [refetching, refetch])

  // console.log({data, isLoading, isSuccess})
  // console.log({isPreviousData})

  return(
    <main>
      <Sorting page={page} />

      <div className='products'>
        { data && <Products products={data.products} />}
      </div>
      
      { 
        (isPreviousData && isFetching) && 
        <p style={{textAlign: 'center'}}>Loading...</p> 
      }
      
      { 
        error && <p style={{textAlign: 'center'}}>{error.message}</p> 
      }
      <Pagination totalPages={totalPages} />
    </main>
  )
}

export default Home;