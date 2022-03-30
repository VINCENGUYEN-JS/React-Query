import React from 'react'
import { useParams } from 'react-router-dom'
import ProductInfo from '../components/ProductInfo'
import useQuery from '../hooks/useQuery'

const ProductDetail = () => {
  const { id } = useParams()
  const { data: product, loading, error } = useQuery(
    `/products/${id}`,
    { saveCache: true, refetchInterval: 0 }
  )


  return (
    <main>
      { product && <ProductInfo product={product} /> }
      { loading && <p style={{textAlign: 'center'}}>Loading...</p> }
      { error && <p style={{textAlign: 'center'}}>{error}</p> }
    </main>
  )
}

export default ProductDetail