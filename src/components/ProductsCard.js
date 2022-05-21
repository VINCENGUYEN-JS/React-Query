import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteProduct } from "../api/productAPI";
// import useMutation from "../hooks/useMutation";
// import LazyLoadImg from './LazyLoadImg'
import useLazyLoading from "../hooks/useLazyLoading";
import Modal from "./Modal";
import ProductForm from "./ProductForm";

import { useMutation } from "react-query";
import { toast } from "react-toastify";

const ProductsCard = ({ product }) => {
  const [openProduct, setOpenProduct] = useState(false);
  const { mutate, isLoading } = useMutation((data) => deleteProduct(data), {
    onSuccess: () => {
      toast.success("Create Product!");
    },
    onError: (err) => {
      toast.error(err.response.data.msg);
    },
  });
  const { ref: imgRef } = useLazyLoading();

  const handleDelete = (id) => {
    if (window.confirm("Do you want to delete this?")) {
      mutate(id);
    }
  };

  return (
    <div className="card">
      <Link to={`/products/${product._id}`}>
        <img alt={product.image} ref={imgRef} className="lazy-load" />
      </Link>

      <div className="box">
        <h3>
          <Link to={`/products/${product._id}`}>
            <span />
            {product.title}
          </Link>
        </h3>
        <h4>${product.price}</h4>

        <div className="btn_div">
          <button className="btn_edit" onClick={() => setOpenProduct(true)}>
            Edit
          </button>

          <button
            className="btn_delete"
            disabled={isLoading}
            onClick={() => handleDelete(product._id)}
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </div>

      {/*--------------- Product Form--------- */}
      {openProduct && (
        <Modal titleTxt="Update Product" setOpen={setOpenProduct}>
          <ProductForm btnTxt="Update" data={product} />
        </Modal>
      )}
    </div>
  );
};

export default ProductsCard;
