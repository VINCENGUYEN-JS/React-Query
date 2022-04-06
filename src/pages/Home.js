import { useState, useEffect, useMemo } from 'react'

import Pagination from '../components/Pagination'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import { useQuery } from 'react-query'
import { getData } from '../api/productAPI'

const Home = () => {
  const [limit, setLimit] = useState(5)
  const { page, sort, refetching } = useMyContext()


  const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;

  const {
    data, isFetching, error, refetch, isPreviousData
  } = useQuery({
    queryKey: key,
    queryFn: getData,
    keepPreviousData: true,
    // cacheTime: 0
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