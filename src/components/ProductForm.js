import React, { useRef } from "react";
import { createProduct, updateProduct } from "../api/productAPI";
// import useMutation from '../hooks/useMutation'

import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const ProductForm = ({ btnTxt, data }) => {
  const multiRef = useRef();
  const queryClient = useQueryClient();
  const create = useMutation((data) => createProduct(data), {
    onSuccess: () => {
      toast.success("Create Product!");
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        predicate: (key) => key.queryKey.startsWith("/products"),
      }),
  });
  const update = useMutation((data) => updateProduct(data), {
    onSuccess: () => {
      toast.success("Create Product!");
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const children = multiRef.current.children;

    const newData = [...children].reduce((obj, child) => {
      if (!child.name) return obj;
      return { ...obj, [child.name]: child.value };
    }, {});

    if (data) {
      const newArr = { ...newData, price: Number(newData.price) };
      const result = shallowEqual(newArr, data);
      if (result) return;
      // axios.put(`products/${data._id}`, newData)
      // .then(res => console.log(res))
      // updateProduct({id: data._id, newData})
      // .then(res => console.log(res))
      update.mutate({ id: data._id, newData });
    } else {
      // axios.post(`products`, newData).then(res => console.log(res))
      // createProduct(newData).then(res => console.log(res))
      create.mutate(newData);
    }
  };

  function shallowEqual(obj1, obj2) {
    const keys = Object.keys(obj1);

    for (let key of keys) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }

  return (
    <div className="product_form">
      <form ref={multiRef} onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product title"
          required
          defaultValue={data?.title}
        />

        <input
          type="text"
          name="description"
          placeholder="Product description"
          required
          defaultValue={data?.description}
        />

        <input
          type="text"
          name="price"
          placeholder="Product price"
          required
          defaultValue={data?.price}
        />

        <input
          type="text"
          name="category"
          placeholder="Product category"
          required
          defaultValue={data?.category}
        />

        <input
          type="text"
          name="image"
          placeholder="Product image"
          required
          defaultValue={data?.image}
        />

        <button disabled={create.isLoading || update.isLoading}>
          {create.isLoading || update.isLoading ? "Loading.." : btnTxt}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
