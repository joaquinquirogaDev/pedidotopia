import React, { useState, useEffect } from "react";
import styles from "./EditProduct.module.css";
import Slider from "../Slider/Slider.js";
//Material-ui
import {
  Input,
  InputLabel,
  Container,
  FormControl,
  FormHelperText,
  Button,
  Grid,
} from "@material-ui/core";
import axios from "axios";

export default function EditProduct(id) {
  const arrayImages = [{ attachment: "" }];
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shopify/products/${id}`).then((res) => {
      setInput({
        Product: res.data.product.title,
        Proveedor: res.data.product.vendor,
        Stock: res.data.product.variants[0].inventory_quantity,
        Price: res.data.product.variants[0].price,
      });
      setImages(res.data.product.images);
    });
  }, []);

  const onChange = function () {
    const data = {
      title: input.Product,
      body_html: "<strong>Good snowboard!</strong>",
      vendor: input.Proveedor,
      published_scope: "web",
      variants: [{ inventory_quantity: input.Stock, price: input.Price }],
      images: arrayImages,
    };
    axios
      .put(`http://localhost:3000/shopify/products/${id}`, data)
      .then((res) => {
        alert("Actualizado correctamente");
      });
  };

  return (
    <form className={styles.form}>
      <Grid alignItems="center">
        <div className={styles.img}>
          <div className={styles.sli}>
            {images.length > 0 && <Slider images={images} />}
          </div>
          <input type="file" name="imagen" accept="image/*" multiple />
        </div>
      </Grid>
      <Container maxWidth="md">
        <Grid
          container
          alignItems="flex-end"
          justify="flex-start"
          direction="column"
          spacing={1}
        >
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="">Producto</InputLabel>
              <Input type="text" />
              <FormHelperText>Escriba su nuevo producto</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="">Proveedor</InputLabel>
              <Input type="text" />
              <FormHelperText>Escriba su nuevo proveedor</FormHelperText>
            </FormControl>
            <Grid item md={12}></Grid>
            <FormControl>
              <InputLabel htmlFor="">Stock</InputLabel>
              <Input type="number" />
              <FormHelperText>Escriba su nuevo stock</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl>
              <InputLabel htmlFor="">Precio</InputLabel>
              <Input type="number" />
              <FormHelperText>Escriba su nuevo precio</FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Button variant="contained" color="primary" onClick={onChange}>
              Guardar cambios
            </Button>
            <Button variant="contained" color="secondary" href="/table">
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
