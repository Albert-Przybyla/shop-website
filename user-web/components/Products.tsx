"use client";
import { fetchProducts } from "@/api/product";
import { PagedResponse } from "@/models/pagedResponse.model";
import { Product } from "@/models/product.model";
import React, { useEffect } from "react";

const Products = () => {
  const [products, setProducts] = React.useState<PagedResponse<Product> | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const getData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {!loading &&
        products?.items.map((product) => {
          return <div key={product.id}>{product.name}</div>;
        })}
    </div>
  );
};

export default Products;
