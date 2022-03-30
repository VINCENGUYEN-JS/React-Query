import React, { useRef } from 'react'
import { createProduct, updateProduct } from '../api/productAPI'
import useMutation from '../hooks/useMutation'

const ProductForm = ({ btnTxt, data }) => {
  const multiRef = useRef()
  const { mutate, loading } = useMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    const children = multiRef.current.children;

    const newData = [...children].reduce((obj, child) => {
      if(!child.name) return obj;
      return {...obj, [child.name]:child.value}
    }, {})

    if(data){
      const newArr = {...newData, price: Number(newData.price)} 
      const result = shallowEqual(newArr, data)
      if(result) return;
      // axios.put(`products/${data._id}`, newData)
      // .then(res => console.log(res))
      // updateProduct({id: data._id, newData})
      // .then(res => console.log(res))
      mutate(() => updateProduct({id: data._id, newData}))
    }else{
      // axios.post(`products`, newData).then(res => console.log(res))
      // createProduct(newData).then(res => console.log(res))
      mutate(() => createProduct(newData))
    }
  }

  function shallowEqual(obj1, obj2) {
    const keys = Object.keys(obj1)

    for(let key of keys){
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }


  return (
    <div className='product_form'>
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input type="text" name="title"
        placeholder="Product title" required
        defaultValue={data?.title}
        />

        <input type="text" name="description"
        placeholder="Product description" required
        defaultValue={data?.description}
        />

        <input type="text" name="price"
        placeholder="Product price" required
        defaultValue={data?.price}
        />

        <input type="text" name="category"
        placeholder="Product category" required
        defaultValue={data?.category}
        />

        <input type="text" name="image"
        placeholder="Product image" required
        defaultValue={data?.image}
        />
        
        <button disabled={loading}>
          { loading ? 'Loading..' : btnTxt }
        </button>
      </form>
    </div>
  )
}

export default ProductForm
