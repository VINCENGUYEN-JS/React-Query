import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Products from '../components/Products'
import Sorting from '../components/Sorting'
import { useMyContext } from '../context/store'
import useInfinityQuery from '../hooks/useInfinityQuery'

const Filter = () => {
  const { option, value } = useParams()
  const { sort } = useMyContext()

  const [products, setProducts] = useState([])
  const [limit, setLimit] = useState(2)
  const [stop, setStop] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)


  const { BtnRender, data, loading, error } = useInfinityQuery({
    url: `/products?price[${option}]=${value}&sort=${sort}&limit=${limit}`,
    depens: [value, sort, option],
    opt: { stop, firstLoad }
  })

  useEffect(() => {
    if(data?.products) {
      setProducts(prev => [...prev, ...data.products])
      setFirstLoad(true)

      if(data.products.length < limit) setStop(true)
    }
  }, [data?.products, limit])

  useEffect(() => {
    setProducts([])
    setStop(false)
    setFirstLoad(false)
  }, [value, sort, option])

  return (
    <> 
      <Sorting />
      <Products products={products} />
      { loading && <p style={{textAlign: 'center'}}>Loading...</p> }
      { error && <p style={{textAlign: 'center'}}>{error}</p> }
      { BtnRender() }
    </>
  )
}

export default Filter