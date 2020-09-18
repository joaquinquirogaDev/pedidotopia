import React from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import styles from "./Answer.module.css";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));
export default function Answer({ match }) {
  const id = match.params.id;
  const history = useHistory();
  const classes = useStyles();

  const onDeleted = function () {
    axios.delete(`http://localhost:3000/shopify/products/${id}`).then((res) => {
      alert("Eliminado correctamente");
      history.push("/table");
    });
  };

  return (
    <form className={styles.form}>
      <contenedor className={styles.contenedor}>
        <div className={classes.root}>
          <Alert icon={false} severity="success">
            Esta Seguro de Borrar?
          </Alert>
        </div>
        <Button variant="contained" color="primary" onClick={onDeleted}>
          Borrar
        </Button>
        <Button variant="contained" color="secondary" href="/table">
          Cancelar
        </Button>
      </contenedor>
    </form>
  );
}
