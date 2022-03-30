import { useState, useEffect, useMemo } from 'react'

import Pagination from '../components/Pagination'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import useQuery from '../hooks/useQuery'

const Home = () => {
  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(5)

  const { page, sort, refetching } = useMyContext()

  const { data, loading, error } = useQuery(
    `/products?limit=${limit}&page=${page}&sort=${sort}`,
    { saveCache: true, refetching }
  )

  useEffect(() => {
    if(data?.products) setProducts(data.products)
  }, [data?.products])

  const totalPages = useMemo(() => {
    if(!data?.count) return 0;
    return Math.ceil(data.count / limit)
  }, [data?.count, limit])


  return(
    <main>
      <Sorting page={page} />
      <Products products={products} />
      { loading && <p style={{textAlign: 'center'}}>Loading...</p> }
      { error && <p style={{textAlign: 'center'}}>{error}</p> }
      <Pagination totalPages={totalPages} />
    </main>
  )
}

export default Home;