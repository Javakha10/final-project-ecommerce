import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../../context/productContext";
import FileBase from "react-file-base64";
import useForm from "../../app/hooks/useForm";

const generateAddProductFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      error: "",
      validateInput: (name) =>
        name.length > 1 ? null : "Name Should Have at least 2 Charachter",
    },

    description: {
      value: selectedProduct?.description || "",
      required: true,
      error: "",
      validateInput: (description) =>
        description.length > 1
          ? null
          : "Description Should Have at least 2 Charachter",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      error: "",
      validateInput: (category) =>
        category.length > 1
          ? null
          : "Category Should Have at least 2 Charachter",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "Brand Should Have at least 2 Charachter",
    },
    price: {
      value: selectedProduct?.price || 0,
      required: true,
      error: "",
      validateInput: (price) =>
        price > 0 ? null : "Price Should be more than 0",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    setFormValues: setProductFormValues,
    onInputChange,
    checkButtonDisable,
    clearForm,
  } = useForm({
    defaultFormValues: generateAddProductFormValues(),
  });

  const {
    selectedProduct,
    isProductUpdating,
    saveProduct,
    setSelectedProduct,
  } = useContext(productContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [image, setImage] = useState("");
  useEffect(() => {
    if (selectedProduct) {
      setProductFormValues(generateAddProductFormValues(selectedProduct));
    }
  }, [selectedProduct]);

  useEffect(() => {
    setIsButtonDisabled(checkButtonDisable(productFormValues));
  }, [productFormValues]);

  const saveProductHandler = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;

    saveProduct({
      name,
      description,
      category,
      brand,
      price,
      image: image || selectedProduct?.image,
    });
  };

  return (
    <div className="App">
      <form>
        {productFormValues.name.error && (
          <h1>{productFormValues.name.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="name"
          value={productFormValues.name.value}
          placeholder="name"
        />
        <br />
        {productFormValues.description.error && (
          <h1>{productFormValues.description.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="description"
          value={productFormValues.description.value}
          placeholder="description"
        />
        <br />
        {productFormValues.category.error && (
          <h1>{productFormValues.category.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="category"
          value={productFormValues.category.value}
          placeholder="category"
        />
        <br />
        {productFormValues.brand.error && (
          <h1>{productFormValues.brand.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="brand"
          value={productFormValues.brand.value}
          placeholder="brand"
        />
        <br />
        {productFormValues.price.error && (
          <h1>{productFormValues.price.error}</h1>
        )}
        <input
          onChange={onInputChange}
          name="price"
          value={productFormValues.price.value}
          placeholder="price"
        />
        <br />
        <FileBase
          type="file"
          multiple={false}
          onDone={({ base64 }) => setImage(base64)}
        />
        <br />
        <button disabled={isButtonDisabled} onClick={saveProductHandler}>
          {selectedProduct ? "EDIT" : "ADD PRODUCT"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
