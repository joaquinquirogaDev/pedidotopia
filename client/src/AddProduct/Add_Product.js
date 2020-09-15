import React, { useEffect, useState } from "react";
import styles from "./Add_Product.module.css";
import { Link } from "react-router-dom";
import Slider from "../Slider/Slider.js";
//Material-ui
import DescriptionIcon from "@material-ui/icons/Description";
import LabelIcon from "@material-ui/icons/Label";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Button from "@material-ui/core/Button";
import InputIcon from "@material-ui/icons/Input";
import CancelPresentationRoundedIcon from "@material-ui/icons/CancelPresentationRounded";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import axios from "axios";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.7),
  },
}));
export default function Add_Product() {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    Product: "",
    Proveedor: "",
    Price: 0,
    Stock: 0,
  });

  const arrayImages = [{ attachment: "" }];
  images.map((e) => {
    arrayImages.push({ attachment: e.replace(/^data:.+;base64,/, "") });
  });

  const onSubmitHandle = function (event) {
    event.preventDefault();
    const data = {
      product: {
        title: input.Product,
        body_html: "<strong>Good snowboard!</strong>",
        vendor: input.Proveedor,
        published_scope: "web",
        variants: [{ inventory_quantity: input.Stock, price: input.Price }],
        images: arrayImages,
      },
    };
    axios
      .post("http://localhost:3000/shopify/products", data)
      .then((response) => {
        console.log("se creo");
        Redirect("/table");
      });
  };

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "Price" || e.target.name === "Stock") {
      setInput({ ...input, [e.target.name]: Number(e.target.value) });
    }
  };

  // const inputImageOnChange = (e) => {
  // var file = e.target.files[0],
  //   reader = new FileReader()

  //   reader.onloadend = function () {
  //     var b64 = reader.result.replace(/^data:.+;base64,/, '')
  //     console.log(b64)
  //     setInputImage(b64)
  //   }
  //   reader.readAsDataURL(file)
  // }

  const uploadImg = async (e) => {
    const files = e.target.files;
    var newImages = [];

    for (let i = 0; i < files.length; i++) {
      const base64 = await convertBase64(files[i]);
      //const string = base64.replace(/^data:.+;base64,/, '');
      newImages.push(base64);
    }
    console.log(newImages);
    setImages(newImages);
    // setInput({
    //   ...input,
    //   image: base64,
    // });
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //const [renderUpdate, setRenderUpdate] = useState(false)
  const classes = useStyles();
  return (
    <form 
      className={styles.form}
      onSubmit={onSubmitHandle}
      encType="multipart/form-data"
    >
      {/* <div className = {styles.imagecontenedor}> */}
      <div className={styles.image} >
        <div className={styles.slider} >
          {images.length > 0 && <Slider images={images}/>}
        </div>
        <input
          type="file"
          name="imagen"
          onChange={(e) => {
            uploadImg(e);
          }}
          accept="image/*"
          multiple
        />
      </div>
      <div className={styles.contenedor}>
        <div className={styles.inputcontenedor}>
          <i className={styles.icon}>{<LabelIcon />}</i>
          <input
            name="Product"
            value={input.Product}
            type="text"
            placeholder="Producto"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputcontenedor}>
          <i className={styles.icon}>{<DescriptionIcon />}</i>
          <input
            className={styles.input}
            name="Proveedor"
            value={input.Proveedor}
            type="text"
            placeholder="Prooveedor"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputcontenedor}>
          <i className={styles.icon}>{<AttachMoneyIcon />}</i>
          <input
            className={styles.input}
            name="Price"
            value={input.Price}
            type="number"
            placeholder="Precio"
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.inputcontenedor}>
          <i className={styles.icon}>{<ShoppingBasketOutlinedIcon />}</i>
          <input
            className={styles.input}
            name="Stock"
            value={input.Stock}
            type="number"
            placeholder="Stock"
            onChange={handleInputChange}
          />
        </div>
        {/* <input type='file' onChange={inputImageOnChange} /> */}
        <div className={styles.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<InputIcon />}
          >
            <Link to="/table">Agregar</Link>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<CancelPresentationRoundedIcon />}
            href="/table"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </form>
  );
}
