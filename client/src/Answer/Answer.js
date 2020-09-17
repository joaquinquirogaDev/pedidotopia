import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import styles from "./Answer.module.css";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function Answer() {
  const history = useHistory();
  const classes = useStyles();
  const onDeleted = function (id, product_id) {
    console.log(id, product_id);
    // if(products[0].id){
    //   const data = {
    //     product: {
    //         id: products[0].product_id
    //     }
    // }
    // console.log(data)
    // axios.delete(`http://localhost:3000/shopify/products/${products[0].id}`,{data: {product: {id: products[0].product_id}}}).then((res) => {
    //   alert("Eliminado correctamente");
    // });
    fetch(`http://localhost:3000/shopify/products/${id}`, {
      method: "DELETE",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          id: product_id,
        },
      }),
    }).then((response) => {
      history.push("/table");
    });
    // }
  };
  return (
    <form className={styles.form}>
      <contenedor className={styles.contenedor}>
        <div className={classes.root}>
          <Alert icon={false} severity="success">
            Esta Seguro de Borrar?
          </Alert>
        </div>
        {/* <Button variant = "contained" color = "primary" onClick = {() => onDeleted(product.id,product.product_id)}>
                 Borrar
                </Button>    */}
        <Button variant="contained" color="secondary" href="/table">
          Cancelar
        </Button>
      </contenedor>
    </form>
  );
}
