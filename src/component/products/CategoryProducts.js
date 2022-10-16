import { CircularProgress, Grid, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAxios } from "../../app/hooks/useAxios";
import PaginationComponent from "./Pagintaion";
import ProductCard from "./ProductCard";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [params, setParams] = useSearchParams();
  const [sort, setSort] = useState("price, desc");
  const { isLoading, data } = useAxios(
    `/products/category/${categoryName}?page=${
      params.get("page") || 1
    }&size=3&sort=${sort}`
  );
  return (
    <div>
      {isLoading && <CircularProgress>loading...</CircularProgress>}
      <Select
        value={sort}
        onChange={(e) => {
          setSort(e.target.value);
          setParams({ page: 1 });
        }}
      >
        <MenuItem value={"price,desc"}>ფასის კლებადობით</MenuItem>
        <MenuItem value={"price,asc"}>ფასის ზრდადობით</MenuItem>
        <MenuItem value={"name,asc"}>A-Z</MenuItem>
        <MenuItem value={"name,desc"}>Z-A</MenuItem>
      </Select>
      <PaginationComponent
        page={params}
        setPage={setParams}
        totalPages={data?.totalPages}
      />
      <Grid container spacing={2}>
        {data?.products?.length > 0 &&
          data.products.map((product) => {
            return (
              <Grid item key={product._id}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default CategoryProducts;
