import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import { useInfiniteQuery } from 'react-query'
import { getInfiniteData } from '../api/productAPI'
import useInView from '../hooks/useInView'

const Filter = () => {
  const { option, value } = useParams()
  const { sort } = useMyContext()
  const [limit, setLimit] = useState(2)

  const { ref, inView } = useInView()

  const key = `/products?price[${option}]=${value}&sort=${sort}&limit=${limit}`;

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(key, getInfiniteData, {
    getNextPageParam: (lastPage, pages) => {
      // console.log({lastPage, pages})
      const { products } = lastPage;
      if(products.length >= limit){
        return pages.length + 1;
      }else{
        return undefined
      }
    },
  }) 

  useEffect(() => {
    if(inView && !isFetchingNextPage){
      fetchNextPage()
    }
  }, [inView, isFetchingNextPage, fetchNextPage])
  

  return (
    <> 
      <Sorting />
      
      <div className='products'>
        {
          data?.pages.map((page, index) => (
            <Products key={index} products={page.products} />
          ))
        }
      </div>
      
      { 
        isFetching && <p style={{textAlign: 'center'}}>Loading...</p> 
      }
      
      { 
        error && <p style={{textAlign: 'center'}}>{error.message}</p> 
      }

      <button className="btn-load_more"
      onClick={() => fetchNextPage()} 
      disabled={!hasNextPage || isFetchingNextPage}
      ref={ref}
      >
        Load more
      </button>
    </>
  )
}

export default Filter