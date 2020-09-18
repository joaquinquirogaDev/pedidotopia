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
  makeStyles
} from "@material-ui/core";
  
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  
  margin: {
    margin: theme.spacing(1),
    
  },
  textField: {
    width: '15ch',
  },
}));

export default function EditProduct({ match }) {
  const id = match.params.id;
  const classes = useStyles();
  // const arrayImages = [{ attachment: "" }];
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/shopify/products/${id}`).then((res) => {
      console.log(res.data.product.title);
      setInput({
        Product: res.data.product.title,
        Proveedor: res.data.product.vendor,
        Stock: res.data.product.variants[0].inventory_quantity,
        Price: res.data.product.variants[0].price,
      });
      setImages(res.data.product.images);
    });
  }, []);

  const onChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "Price" || e.target.name === "Stock") {
      setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
  };

  const onSubmit = function () {
    const data = {
      product: {
        id: id,
        title: input.Product,
        body_html: "<strong>Good snowboard!</strong>",
        vendor: input.Proveedor,
        published_scope: "web",
        variants: [{ inventory_quantity: input.Stock, price: input.Price }],
        // images: arrayImages,
      },
    };
    axios
      .put(`http://localhost:3000/shopify/products/${id}`, data)
      .then((res) => {
        alert("Actualizado correctamente");
      });
  };

  return (
    <form className={styles.form}>
      <div className = {styles.image}>

      
      <Grid alignItems="center">
        <div className={styles.img}>
          <div className={styles.sli}>
            {images.length > 0 && <Slider images={images} />}
          </div>
          <input type="file" name="imagen" accept="image/*" multiple />
        </div>
      </Grid>
      </div>
      <Container maxWidth="md">
        <Grid
          container
          alignItems="flex-end"
          justify="flex-start"
          direction="column"
          spacing={1}
        >
          <Grid item md={12}>
            <FormControl fullWidth className={classes.margin} variant = "standard">
            <div className = {styles.inputcontainer}>
              
              <Input
                type="text"
                name="Product"
                value={input.Product}
                onChange={onChange}
              />
              </div>
              <FormHelperText>Escriba su nuevo producto</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth className={classes.margin} variant = "standard">
            <div className = {styles.inputcontainer}>
              
              <Input
                type="text"
                name="Proveedor"
                value={input.Proveedor}
                onChange={onChange}
              />
              </div>
              <FormHelperText>Escriba su nuevo proveedor</FormHelperText>
            </FormControl>
            <Grid item md={12}></Grid>
            <FormControl fullWidth className={classes.margin} variant = "standard">
              <div className = {styles.inputcontainer}>
              <Input
                type="number"
                name="Stock"
                value={input.Stock}
                onChange={onChange}
              />
              </div>
              <FormHelperText>Escriba su nuevo stock</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <FormControl fullWidth className={classes.margin} variant = "standard">
            <div className = {styles.inputcontainer}>
              <Input
                type="number"
                name="Price"
                value={input.Price}
                onChange={onChange}
              />
              </div>
              <FormHelperText>Escriba su nuevo precio</FormHelperText>
            </FormControl>
          </Grid>
          <Grid
            direction="row"
            justify="center"
            alignItems="center"
            spacing={10}
          >
            <Button variant="contained" color="primary" onClick={onSubmit}>
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
